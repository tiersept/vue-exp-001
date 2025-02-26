<template>
  <div>
    <!-- <nuxt name="popup" /> -->
    <nuxt />
    <!-- vertex shader -->
    <script id="plane-vs" type="x-shader/x-vertex">
    #ifdef GL_ES
    precision mediump float;
    #endif
    // those are the mandatory attributes that the lib sets
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;
    // those are mandatory uniforms that the lib sets and that contain our model view and projection matrix
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    // our texture matrix that will handle image cover
    uniform mat4 uTextureMatrix0;
    // pass your vertex and texture coords to the fragment shader
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;
    void main() {
    vec3 vertexPosition = aVertexPosition;
    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
    // set the varyings
    // here we use our texture matrix to calculate the accurate texture coords
    vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
    vVertexPosition = vertexPosition;
    }
    </script>
    <!-- fragment shader -->
    <script id="plane-fs" type="x-shader/x-fragment">
    #ifdef GL_ES
    precision mediump float;
    #endif
    // get our varyings
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;
    // the uniform we declared inside our javascript
    uniform float uTime;
    // our texture sampler (default name, to use a different name please refer to the documentation)
    uniform sampler2D uSampler0;
    void main() {
    // get our texture coords from our varying
    vec2 textureCoord = vTextureCoord;
    // displace our pixels along the X axis based on our time uniform
    // textures coords are ranging from 0.0 to 1.0 on both axis
    textureCoord.x += sin(textureCoord.y * 25.0) * cos(textureCoord.x * 25.0) * (cos(uTime / 50.0)) / 25.0;
    // map our texture with the texture matrix coords
    gl_FragColor = texture2D(uSampler0, textureCoord);
    }
    </script>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    }
  }
}
</script>


<style>
/* html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
} */

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

body {
  overflow-x: hidden;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
