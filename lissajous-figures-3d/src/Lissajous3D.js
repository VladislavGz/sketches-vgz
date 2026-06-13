import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ControlLine } from './ControlLine.js';
import { Figure } from './Figure.js';
import { Point3D } from './Point3D.js';

export class Lissajous3D {
    constructor () {
        // Создаём рендерер и добавляем в body
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x050510, 1);
        document.body.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();

        // Камера: угол обзора, соотношение, ближняя/дальняя
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(2.2, 1.8, 2.5);
        this.camera.lookAt(0, 0, 0);

        // Управление камерой
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;

        // --- Объекты сцены ---
        // Оси координат
        const axesHelper = new THREE.AxesHelper(1.2);
        this.scene.add(axesHelper);

        // Вспомогательная сетка на полу (для ориентации)
        const gridHelper = new THREE.GridHelper(3, 20, 0x88aaff, 0x335588);
        gridHelper.position.y = -1.2;
        this.scene.add(gridHelper);

        // Линия фигуры (динамическая)
        this.figureLineGeometry = new THREE.BufferGeometry();
        this.figureLineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffcc });
        this.figureLine = new THREE.Line(this.figureLineGeometry, this.figureLineMaterial);
        this.scene.add(this.figureLine);

        // Шарик
        const sphereGeo = new THREE.SphereGeometry(0.045, 32, 32);
        const sphereMat = new THREE.MeshStandardMaterial({ color: 0xffaa44, emissive: 0x442200 });
        this.sphere = new THREE.Mesh(sphereGeo, sphereMat);
        this.scene.add(this.sphere);

        // Освещение
        const ambientLight = new THREE.AmbientLight(0x404060);
        this.scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(1, 2, 1);
        this.scene.add(dirLight);
        const backLight = new THREE.PointLight(0x4466cc, 0.3);
        backLight.position.set(-1, 0.5, -1.5);
        this.scene.add(backLight);

        // --- Параметры Лиссажу ---
        this.xLine = new ControlLine(1.0, 1.0, 0);
        this.yLine = new ControlLine(1.0, 1.2, Math.PI / 2);
        this.zLine = new ControlLine(0.8, 0.7, 0);

        this.figure = new Figure(200);
        this.timeSec = 0;
        this.lastTimestamp = 0;

        // Привязка UI
        this.bindUI();

        // Запуск анимации
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);

        // Обработка изменения размера окна
        window.addEventListener('resize', () => this.onResize());
    }

    bindUI () {
        // X
        const ax = document.getElementById('ax');
        const fx = document.getElementById('fx');
        const px = document.getElementById('px');
        const axVal = document.getElementById('axVal');
        const fxVal = document.getElementById('fxVal');
        const pxVal = document.getElementById('pxVal');
        ax.addEventListener('input', (e) => { this.xLine.setAmplitude(parseFloat(e.target.value)); axVal.innerText = e.target.value; });
        fx.addEventListener('input', (e) => { this.xLine.setFrequency(parseFloat(e.target.value)); fxVal.innerText = e.target.value; });
        px.addEventListener('input', (e) => { this.xLine.setPhase(parseFloat(e.target.value)); pxVal.innerText = e.target.value; });

        // Y
        const ay = document.getElementById('ay');
        const fy = document.getElementById('fy');
        const py = document.getElementById('py');
        const ayVal = document.getElementById('ayVal');
        const fyVal = document.getElementById('fyVal');
        const pyVal = document.getElementById('pyVal');
        ay.addEventListener('input', (e) => { this.yLine.setAmplitude(parseFloat(e.target.value)); ayVal.innerText = e.target.value; });
        fy.addEventListener('input', (e) => { this.yLine.setFrequency(parseFloat(e.target.value)); fyVal.innerText = e.target.value; });
        py.addEventListener('input', (e) => { this.yLine.setPhase(parseFloat(e.target.value)); pyVal.innerText = e.target.value; });

        // Z
        const az = document.getElementById('az');
        const fz = document.getElementById('fz');
        const pz = document.getElementById('pz');
        const azVal = document.getElementById('azVal');
        const fzVal = document.getElementById('fzVal');
        const pzVal = document.getElementById('pzVal');
        az.addEventListener('input', (e) => { this.zLine.setAmplitude(parseFloat(e.target.value)); azVal.innerText = e.target.value; });
        fz.addEventListener('input', (e) => { this.zLine.setFrequency(parseFloat(e.target.value)); fzVal.innerText = e.target.value; });
        pz.addEventListener('input', (e) => { this.zLine.setPhase(parseFloat(e.target.value)); pzVal.innerText = e.target.value; });

        // Длина следа
        const lenSlider = document.getElementById('traceLen');
        const lenVal = document.getElementById('lenVal');
        lenSlider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            this.figure.setMaxLength(val);
            lenVal.innerText = val;
        });

        // Установка начальных значений
        ax.dispatchEvent(new Event('input'));
        fx.dispatchEvent(new Event('input'));
        px.dispatchEvent(new Event('input'));
        ay.dispatchEvent(new Event('input'));
        fy.dispatchEvent(new Event('input'));
        py.dispatchEvent(new Event('input'));
        az.dispatchEvent(new Event('input'));
        fz.dispatchEvent(new Event('input'));
        pz.dispatchEvent(new Event('input'));
        lenSlider.dispatchEvent(new Event('input'));
    }

    updateFigureGeometry () {
        const points = this.figure.points;
        if (points.length < 2) {
            this.figureLine.visible = false;
            return;
        }
        this.figureLine.visible = true;
        const vertices = [];
        for (let p of points) {
            vertices.push(p.x, p.y, p.z);
        }
        // Обновляем геометрию
        const newGeo = new THREE.BufferGeometry();
        newGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
        const oldGeo = this.figureLine.geometry;
        this.figureLine.geometry = newGeo;
        if (oldGeo) oldGeo.dispose();
    }

    tick (deltaTimeSec) {
        this.timeSec += deltaTimeSec;

        this.xLine.calc(this.timeSec);
        this.yLine.calc(this.timeSec);
        this.zLine.calc(this.timeSec);

        const x = this.xLine.value;
        const y = this.yLine.value;
        const z = this.zLine.value;

        this.figure.addPoint(new Point3D(x, y, z));
        this.updateFigureGeometry();
        this.sphere.position.set(x, y, z);
    }

    animate (timeMs) {
        const now = timeMs * 0.001;
        if (this.lastTimestamp === 0) {
            this.lastTimestamp = now;
            requestAnimationFrame((t) => this.animate(t));
            return;
        }
        let dt = Math.min(0.033, now - this.lastTimestamp);
        if (dt > 0) this.tick(dt);
        this.lastTimestamp = now;

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame((t) => this.animate(t));
    }

    onResize () {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }
}