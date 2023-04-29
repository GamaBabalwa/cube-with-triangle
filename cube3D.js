const canvas = document.querySelector("canvas");
const webgl = canvas.getContext(`webgl`);

if (!webgl) {
    throw Error("Not related to webgl");
}

const Vertex = new Float32Array([
    //front side
    -1, 1, 1,
    1, -1, 1,
    -1, -1, 1,

    -1, 1, 1,
    1, 1, 1,
    1, -1, 1,

    //back side
    -1, 1, -1,
    1, -1, -1,
    -1, -1, -1,

    -1, 1, -1,
    1, 1, -1,
    1, -1, -1,

    //Top side
    -1, 1, -1,
    1, 1, 1,
    -1, 1, 1,

    -1, 1, -1,
    1, 1, -1,
    1, 1, 1,

    //Bottom side
    -1, -1, -1,
    1, -1, 1,
    -1, -1, 1,

    -1, -1, -1,
    1, -1, -1,
    1, -1, 1,

    //Right side
    1, 1, 1,
    1, -1, -1,
    1, -1, 1,

    1, 1, 1,
    1, 1, -1,
    1, -1, -1,

    //Left side
    -1, 1, 1,
    -1, -1, -1,
    -1, -1, 1,

    -1, 1, 1,
    -1, 1, -1,
    -1, -1, -1

])

const triangle = new Float32Array([
    0.5, 1, 0,
    0.2, 0.2, 0,
    0.8, 0.2, 0
])

const Colour = new Float32Array([
    //front side
    0.0, 1.0, 1.0,
    0, 1.0, 0,
    1.0, 1.0, 0,

    1.0, 0, 0,
    1, 0.8, 0,
    1, 0.5, 1,

    //back side
    0.2, 1, 0.2,
    1, 1, 1,
    1, 1, 1,

    0.1, 0.2, 1,
    1, 0.5, 0.5,
    1, 0.5, 0.5,

    //Top side
    0.1, 0.5, 1,
    0.2, 0.8, 1,
    0.1, 0.1, 0.2,

    0.5, 1, 0.2,
    1, 0.5, 0.2,
    0.9, 0.1, 0.8,

    //Bottom side
    0.2, 0.4, 1,
    0.2, 0.4, 1,
    0.2, 0.4, 1,

    0.6, 0.8, 1,
    0.2, 1, 0.2,
    0.1, 0.5, 0.5,

    //Left side
    1, 0.2, 1,
    1, 0.3, 0.5,
    0.2, 1, 0.8,

    0.2, 0.5, 1,
    1, 0.4, 0.2,
    1, 0.3, 0.8,

    //Righ side
    0.5, 1, 1,
    0.2, 0.2, 1,
    1, 0.8, 0.2,

    0.2, 1, 0.2,
    1, 1, 0.1,
    0, 0.8, 0.7

])

const triangleColour = new Float32Array([
    1.0, 0, 0,
    0, 1, 0,
    0, 0, 1
])

const textures = new Float32Array([
    0,1, 1,0, 0,0,
    0,1,1,1,1,0,

    0,1 ,1,0 ,0,0,
    0,1 ,1,1, 1,0,

    0,1, 1,0, 0,0,
    0,1,1,1,1,0,

    0,1 ,1,0 ,0,0,
    0,1 ,1,1, 1,0,

    0,1 ,1,0 ,0,0,
    0,1 ,1,1, 1,0,

    0,1 ,1,0 ,0,0,
    0,1 ,1,1, 1,0, 

]);

var model_a=[];
var angleInRad=20;
var c =0;
var s =0;
/*
let model_b= createmat4();
model_b=multiplies(model_b,rotationMatrix)
function createmat4(){
    return new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ])
}
;*/
/*function rotx(angleInRad) {
    var c =Math.cos(angleInRad);
    var s =Math.sin(angleInRad);
    return new Float32Array([
        1, 0, 0, 0,
        0, c, -s, 0,
        0, s, c, 0,
        0, 0, 0, 1
    ]);
}

function roty(angleInRad) {
    var c =Math.cos(angleInRad);
    var s =Math.sin(angleInRad);
    return new Float32Array([
        c, 0, -s, 0,
        0, 1, 0, 0,
        s, 0, c, 0,
        0, 0, 0, 1
    ]);
}

function rotz(angleInRad) {
    var c =Math.cos(angleInRad);
    var s =Math.sin(angleInRad);
    return new Float32Array([
        c, -s, 0, 0,
        s, c, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);
}*/



function translate(tx,ty,tz){
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    tx,ty,tz, 1
}
const vBuffer = webgl.createBuffer()
webgl.bindBuffer(webgl.ARRAY_BUFFER, vBuffer)
webgl.bufferData(webgl.ARRAY_BUFFER, Vertex, webgl.STATIC_DRAW);

const triangleBuffer = webgl.createBuffer()
webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleBuffer)
webgl.bufferData(webgl.ARRAY_BUFFER, triangle, webgl.STATIC_DRAW);

const cBuffer = webgl.createBuffer()
webgl.bindBuffer(webgl.ARRAY_BUFFER, cBuffer)
webgl.bufferData(webgl.ARRAY_BUFFER, Colour, webgl.STATIC_DRAW);

const texturebuffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, texturebuffer);
webgl.bufferData(webgl.ARRAY_BUFFER, textures, webgl.STATIC_DRAW);
let imagedata = new Image();
imagedata.src ="SA.jpg"; 

const vSource = `
        attribute vec3 pos;
        attribute vec3 color;
        varying vec3 fragcolor;
        attribute vec2 texCoord;
        varying vec2 fTexCoord; 
        uniform float shiftx,shifty,shrink,a;
        float x,y,z,m;
        uniform mat4 model_a;  //craete variable for matrices

        void main(){
           /* gl_Position.x=pos.x*0.3+shiftx;
            gl_Position.y=pos.y*0.3+shifty; 
            gl_Position.z=0.0;
            gl_Position.w=1.0;  */

            //Rotate in X position
            /* y = pos.y*cos(a)-pos.z*sin(a);
            z = pos.y*sin(a)+pos.z*cos(a);
            x = pos.x;
 
             gl_Position.y=model_a*y*shrink+shifty;
             gl_Position.z=model_a*z*shrink;
             gl_Position.x=model_a*x*shrink+shiftx;
             gl_Position.w=2.0;
             */
             //gl_Position=model_a*vec4(x*shrink,y*shrink,z*shrink,1)+vec4(shiftx,shifty,0,0);

             gl_Position=model_a*vec4(pos*shrink,5);
           

            //Rotate in Y position
          /*x = pos.x*cos(a)-pos.z*sin(a);
           z = pos.x*sin(a)+pos.z*cos(a);
           y = pos.y;

            gl_Position.x=x*shrink+shiftx;
            gl_Position.z=z*shrink;
            gl_Position.y=y*shrink+shifty;
            gl_Position.w=2.0;
*/
    //line 194 is the same as line 188-191
           // gl_Position=vec4(x*shrink,y*shrink,z*shrink,1)+vec4(shiftx,shifty,0,0);

            //Rotate in Z position
           /*  x = pos.x*cos(a)-pos.y*sin(a);
            y = pos.x*sin(a)+pos.y*cos(a);
            z = pos.z;

            gl_Position.x=x*shrink+shiftx;
            gl_Position.y=y*shrink+shifty;
            gl_Position.z=z*shrink;
            gl_Position.w=1.0;
            */
           //gl_Position=vec4(x*shrink,y*shrink,z,2)+vec4(shiftx,shifty,0,0);
               
              //gl_Position=vec4(pos.x*shrink,pos.y*shrink,0.0,1)+vec4(shiftx,shifty,0,0);
               //  gl_Position=matrices*vec4(pos.x*0.3,pos.y*0.3,pos.z*0.3,1)+vec4(shiftx,shifty,0,0);  // multiply your matrice to your vec4
                fragcolor=color;
                fTexCoord = texCoord;
        }
`

const cSource = `
        precision mediump float;
        varying vec3 fragcolor;
        varying vec2 fTexCoord;
        uniform sampler2D uSampler;

        void main(){
                gl_FragColor=vec4(fragcolor,1);
                gl_FragColor = texture2D(uSampler,fTexCoord);
        }
`

const vShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(vShader, vSource);
webgl.compileShader(vShader);

const cShader = webgl.createShader(webgl.FRAGMENT_SHADER);
webgl.shaderSource(cShader, cSource);
webgl.compileShader(cShader)

const program = webgl.createProgram();
webgl.attachShader(program, vShader);
webgl.attachShader(program, cShader);
webgl.linkProgram(program);



webgl.bindBuffer(webgl.ARRAY_BUFFER, cBuffer)
const colourLocation = webgl.getAttribLocation(program, "color")
webgl.enableVertexAttribArray(colourLocation);
webgl.vertexAttribPointer(colourLocation, 3, webgl.FLOAT, false, 0, 0);

webgl.bindBuffer(webgl.ARRAY_BUFFER, texturebuffer);
    const textureLocation = webgl.getAttribLocation(program, `texCoord`);
    webgl.enableVertexAttribArray(textureLocation);
    webgl.vertexAttribPointer(textureLocation, 2, webgl.FLOAT, false, 0, 0);

const texture = webgl.createTexture();
webgl.bindTexture(webgl.TEXTURE_2D,texture);

webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.LINEAR);
webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.LINEAR);
webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_S, webgl.CLAMP_TO_EDGE);
webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_T, webgl.CLAMP_TO_EDGE);

webgl.texImage2D(webgl.TEXTURE_2D,0,webgl.RGBA,webgl.RGBA,webgl.UNSIGNED_BYTE,imagedata);
//webgl.generateMipmap(webgl.TEXTURE_2D);

var x = 0;
var y = 0;
var z = 0;
var scale = 0.1;

var x_triangle = 0.0;
var y_triangle = 0.0;
var angle = 0.0;


function draw() {
    webgl.clearColor(0.0, 0.0, 0.5, 1);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
    angleInRad=angleInRad+0.025;

    c =Math.cos(angleInRad);
    s =Math.sin(angleInRad);

    model_a=[ 1, 0, 0, 0,
              0, c, -s, 0,
              0, s, c, 0,
              x, y, 0, 1];

    //  webgl.uniformMatrix4fv(webgl.getUniformLocation(program,"matrices"), false, matrice)
    webgl.uniform1f((webgl.getUniformLocation(program, "shiftx")), x);
    webgl.uniform1f((webgl.getUniformLocation(program, "shifty")), y);
    webgl.useProgram(program);
    webgl.bindBuffer(webgl.ARRAY_BUFFER, vBuffer)
    var positionLocation = webgl.getAttribLocation(program, "pos")
    webgl.enableVertexAttribArray(positionLocation);
    webgl.vertexAttribPointer(positionLocation, 3, webgl.FLOAT, false, 0, 0)
    webgl.uniform1f((webgl.getUniformLocation(program, "shrink")), scale);
    webgl.uniform1f((webgl.getUniformLocation(program, "a")), angle);
    webgl.uniformMatrix4fv(webgl.getUniformLocation(program,"model_a"),false,model_a)
    webgl.drawArrays(webgl.TRIANGLES, 0, Vertex.length / 3);

    /*angle += 0.04;
    webgl.uniform1f((webgl.getUniformLocation(program, "shiftx")), x_triangle);
    webgl.uniform1f((webgl.getUniformLocation(program, "shifty")), y_triangle);
    webgl.useProgram(program);
    webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleBuffer)
    positionLocation = webgl.getAttribLocation(program, "pos")
    webgl.enableVertexAttribArray(positionLocation);
    webgl.vertexAttribPointer(positionLocation, 3, webgl.FLOAT, false, 0, 0)*/
    webgl.drawArrays(webgl.TRIANGLES, 0, Vertex.length / 3);



    window.requestAnimationFrame(draw);

    /* webgl.drawArrays(webgl.TRIANGLES, 0,Vertex.length/3);
     window.requestAnimationFrame(draw);*/
}
draw();

document.onkeydown = function (event) {
    switch (event.key) {
        case "ArrowLeft":
            console.log("arrow left pressed");
            x = x - 0.01;
            break;
        case "ArrowRight":
            console.log("arrow right pressed");
            x = x + 0.01;
            break;
        case "ArrowDown":
            console.log("arrow down pressed");
            y = y - 0.01;
            break;
        case "ArrowUp":
            console.log("arrow up pressed");
            y = y + 0.01;
            break;

        case "r":
            console.log("triangle right");
            x_triangle += 0.1;
            break;
        case "l":
            console.log("triangle left");
            x_triangle -= 0.1;
            break;
        case "u":
            console.log("triangle up");
            y_triangle += 0.1;
            break;
        case "y":
            console.log("triangle down");
            y_triangle -= 0.1;
            break;

        case "i":
            console.log("triangle down");
            scale += 0.1;
            console.log(scale);
            break;

        case "d":
            console.log("Decrease");
            scale -= 0.1;
            console.log(scale);
            break;

    }
};