# particles-grid-animation
## 1. About
The "particles" code makes it easy to insert an animated background of particles and grids on the page.

Here you can quickly see how it works: https://vladislavgz.ru/archive/particles-grid-animation/

## 2. Get started
To use this in a project, you need to copy the particles file.js to the project and connect to the page:

`<script src='/yourPath/particles.js'></script>`

Or use import if you use modules:

`import {Particles} from '/yourPath'`

Next, you must create an instance of the class:

`new Particles (container);`

## Parameters
The constructor of the Particles class takes two arguments:

`new Particles (container, options);`

`container` - required (HTML Element). The container in which the canvas element will be placed for rendering particles and grids. You can apply any styles to this container, including adaptability. The inner canvas element will always occupy 100% of the height and width of the parent container.

`options` - optional. With this parameter, you can set the settings for the behavior of particles and grids, as well as colors and some other options. If the parameter is omitted, then all options take the default value.

Structure and default values for the optional parameter:

```
{
    count: 200,                         //number of particles
    lineLength: 100,                    //maximum link length

    particleSize: {
        baseSize: 0.2,                  //initial particle size
        functionalSize: false,          //if true, the size will depend on the number of links
        functionalSizeCoef: 0.2,        //the amount of size increase per link
    },

    style: {
        particleColor: '#aaaaaa',       //the color of the particles
        lineColor: '#444444'            //line color
    },

    maxSpeed: 0.3                       //maximum particle velocity
}
```