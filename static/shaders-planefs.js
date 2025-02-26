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
