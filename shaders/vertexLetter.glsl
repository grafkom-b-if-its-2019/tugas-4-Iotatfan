precision mediump float;

#define pi 3.14
#define operation pi/180

attribute vec3 vPosition;
uniform vec3 theta;
uniform float scale;
uniform mat4 projection;
uniform mat4 modelView;

void main(){
	gl_Position = vec4(vPosition,1.);

	gl_Position = projection * modelView * gl_Position;
}
 