(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
  
    // Inisialisasi shaders dan program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
 

    var vertexShaderLetter = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var fragmentShaderLetter = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
    var program2 = glUtils.createProgram(gl, vertexShaderLetter, fragmentShaderLetter);

    //////////////////////////////////////////////////////////// Cube Area ///////////////////////////////////////////////////////////////

    var cubeVertices = [];

    function InitCube(){
      gl.useProgram(program);

      cubeVertices = [
        // x, y, z            u, v         normal
  
        // -0.5,  0.5,  0.5,     0.67, 0.5,  0.0, 0.0, 1.0, // depan, merah, BAD BDC
        // -0.5, -0.5,  0.5,     0.67, 0.0,  0.0, 0.0, 1.0, 
        //  0.5, -0.5,  0.5,     1.00, 0.0,  0.0, 0.0, 1.0, 
        // -0.5,  0.5,  0.5,     0.67, 0.5,  0.0, 0.0, 1.0, 
        //  0.5, -0.5,  0.5,     1.00, 0.0,  0.0, 0.0, 1.0, 
        //  0.5,  0.5,  0.5,     1.00, 0.5,  0.0, 0.0, 1.0, 
  
         0.5,  0.5,  0.5,     0.0,  0.5,  1.0, 0.0, 0.0, // kanan, hijau, CDH CHG
         0.5, -0.5,  0.5,     0.0,  0.0,  1.0, 0.0, 0.0,
         0.5, -0.5, -0.5,     0.33, 0.0,  1.0, 0.0, 0.0,
         0.5,  0.5,  0.5,     0.0,  0.5,  1.0, 0.0, 0.0,
         0.5, -0.5, -0.5,     0.33, 0.0,  1.0, 0.0, 0.0,
         0.5,  0.5, -0.5,     0.33, 0.5,  1.0, 0.0, 0.0,
  
         0.5, -0.5,  0.5,     0.33, 1.0,  0.0, -1.0, 0.0, // bawah, biru, DAE DEH
        -0.5, -0.5,  0.5,     0.00, 1.0,  0.0, -1.0, 0.0,
        -0.5, -0.5, -0.5,     0.00, 0.5,  0.0, -1.0, 0.0,
         0.5, -0.5,  0.5,     0.33, 1.0,  0.0, -1.0, 0.0,
        -0.5, -0.5, -0.5,     0.0,  0.5,  0.0, -1.0, 0.0,
         0.5, -0.5, -0.5,     0.33, 0.5,  0.0, -1.0, 0.0,
  
        -0.5, -0.5, -0.5,     0.66, 1.0,  0.0, 0.0, -1.0, // belakang, kuning, EFG EGH
        -0.5,  0.5, -0.5,     0.33, 1.0,  0.0, 0.0, -1.0,
         0.5,  0.5, -0.5,     0.33, 0.5,  0.0, 0.0, -1.0,
        -0.5, -0.5, -0.5,     0.66, 1.0,  0.0, 0.0, -1.0,
         0.5,  0.5, -0.5,     0.33, 0.5,  0.0, 0.0, -1.0,
         0.5, -0.5, -0.5,     0.66, 0.5,  0.0, 0.0, -1.0,
  
        -0.5,  0.5, -0.5,     0.66, 0.5,  -1.0, 0.0, 0.0, // kiri, cyan, FEA FAB
        -0.5, -0.5, -0.5,     0.33, 0.5,  -1.0, 0.0, 0.0,
        -0.5, -0.5,  0.5,     0.33, 0.0,  -1.0, 0.0, 0.0,
        -0.5,  0.5, -0.5,     0.66, 0.5,  -1.0, 0.0, 0.0,
        -0.5, -0.5,  0.5,     0.33, 0.0,  -1.0, 0.0, 0.0,
        -0.5,  0.5,  0.5,     0.66, 0.0,  -1.0, 0.0, 0.0,
  
         0.5,  0.5, -0.5,     1.00, 1.0,  0.0, 1.0, 0.0, // atas, magenta, GFB GBC
        -0.5,  0.5, -0.5,     0.67, 1.0,  0.0, 1.0, 0.0,
        -0.5,  0.5,  0.5,     0.67, 0.5,  0.0, 1.0, 0.0,
         0.5,  0.5, -0.5,     1.00, 1.0,  0.0, 1.0, 0.0,
        -0.5,  0.5,  0.5,     0.67, 0.5,  0.0, 1.0, 0.0,
         0.5,  0.5,  0.5,     1.00, 0.5,  0.0, 1.0, 0.0
      ];
  
      var cubeVBO = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, cubeVBO);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);
  
      var vPosition = gl.getAttribLocation(program, 'vPosition');
      var vTexCoord = gl.getAttribLocation(program, 'vTexCoord');
      var vNormal = gl.getAttribLocation(program, 'vNormal');
      gl.vertexAttribPointer(
        vPosition,  // variabel yang memegang posisi attribute di shader
        3,          // jumlah elemen per attribute
        gl.FLOAT,   // tipe data atribut
        gl.FALSE,
        8 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
        0                                   // offset dari posisi elemen di array
      );
      gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, gl.FALSE, 
        8 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
      gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, gl.FALSE, 
        8 * Float32Array.BYTES_PER_ELEMENT, 5 * Float32Array.BYTES_PER_ELEMENT);
  
      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vTexCoord);
      gl.enableVertexAttribArray(vNormal);
    }

    var theta = [0.0, 0.0, 0.0];
    var axis = 0;
    var xAxis = 0;
    var yAxis = 1;
    var zAxis = 2;

    gl.useProgram(program);

    // Uniform untuk definisi cahaya
    var lightColorLoc = gl.getUniformLocation(program, 'lightColor');
    var lightPositionLoc = gl.getUniformLocation(program, 'lightPosition');
    var ambientColorLoc = gl.getUniformLocation(program, 'ambientColor');
    var lightColor = [0.5, 0.5, 0.5];
    var ambientColor = glMatrix.vec3.fromValues(0.17, 0.40, 0.67);
    gl.uniform3fv(lightColorLoc, lightColor);
    gl.uniform3fv(ambientColorLoc, ambientColor);

    var nmLoc = gl.getUniformLocation(program, 'normalMatrix');

    // Definisi view, model, dan projection
    var vmLoc = gl.getUniformLocation(program, 'view');
    var pmLoc = gl.getUniformLocation(program, 'projection');
    var mmLoc = gl.getUniformLocation(program, 'model');

    var vm = glMatrix.mat4.create();
    var pm = glMatrix.mat4.create();

    glMatrix.mat4.lookAt(vm,
      glMatrix.vec3.fromValues(0.0, 0.0, 0.0),    // posisi kamera
      glMatrix.vec3.fromValues(0.0, 0.0, 0.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
      glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
    );

    var fovy = glMatrix.glMatrix.toRadian(90.0);
    var aspect = canvas.width / canvas.height;
    var near = 0.5;
    var far = 10.0;
    glMatrix.mat4.perspective(pm,
      fovy,
      aspect,
      near,
      far
    );
   
    gl.uniformMatrix4fv(vmLoc, false, vm);
    gl.uniformMatrix4fv(pmLoc, false, pm);

    //////////////////////////////////////////////////////////// Letter Area ///////////////////////////////////////////////////////////////

    var letterVerticesCount;
    var letterBuffer;
    var letterVertices = [];
    var letterPos;
    var boundary = [1, 13, 30, 3];

    InitLetter();

    function InitLetter(){
      gl.useProgram(program2);

      letterVertices = new Float32Array([
        //x,y         
        -0.2, -0.5,  0.0,    
        0.0,  0.5,   0.0,      
        0.2,  -0.5,  0.0,

        -0.2, -0.5,  0.0,
        -0.15,-0.7,  0.0, 
        -0.1, -0.5,  0.0,

        -0.24, -0.7, 0.0,
        -0.2,  -0.5, 0.0,
        -0.15, -0.7, 0.0,

        0.24, -0.7,  0.0,
        0.2,  -0.5,  0.0,
        0.15, -0.7,  0.0,

        0.2,  -0.5,  0.0,
        0.15, -0.7,  0.0,
        0.1,  -0.5,  0.0,
      ]);

      letterVerticesCount = letterVertices.length/2;

      letterVertices = matrixScaling(letterVertices, 0.3);

      letterBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, letterBuffer);
      
      letterPos = gl.getAttribLocation(program2, 'vPosition');
      // var vColor = gl.getAttribLocation(program2, 'vColor');
      var projection = gl.getUniformLocation(program2, 'projection');
      var modelView = gl.getUniformLocation(program2, 'modelView');
      
      gl.uniformMatrix4fv(projection, false, pm);
      gl.uniformMatrix4fv(modelView, false, vm);
      
      gl.bufferData(gl.ARRAY_BUFFER, letterVertices, gl.STATIC_DRAW);
      gl.vertexAttribPointer(letterPos, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(letterPos);

      gl.useProgram(program);
    }
    
    var vec = [0.0, 0.0, 0.0];
    var rotation = 1;
    var rotationDir = 1;
    var nrp = 0.000067;
    var center = [0.0, 0.0, 0.0];
    var keyPress = {};

    function BounceLetter(){
      gl.useProgram(program2);
      gl.bindBuffer(gl.ARRAY_BUFFER, letterBuffer);

      var x = 0;
      for(var i = 0; i < 4; i++){
        for(var j = 0; j < 3; j++){
          x = boundary[i] * 3;
          if(letterVertices[x + j] >= 0.45 || letterVertices[x + j] <= -0.45 ){
            vec[j] *= -1;
            if(j == 0 || j == 2){
              rotationDir *= -1;
            }
          }
        }
      }

      letterVertices = matrixTranslating(letterVertices, vec[0], vec[1], vec[2]);
      
      for(var i = 0; i < 3; i++){
        center[i] += vec[i];
      }

      letterVertices = matrixRotating(letterVertices, rotation * rotationDir , center[0], center[2]);
      gl.bufferData(gl.ARRAY_BUFFER, letterVertices, gl.STATIC_DRAW);
      gl.vertexAttribPointer(letterPos, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(letterPos);
      gl.useProgram(program);
    }


  //////////////////////////////////////////////////////////////////// Render Area ////////////////////////////////////////////

  function render() {
    // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      InitCube();
      
      // theta[axis] += glMatrix.glMatrix.toRadian(0.5);  // dalam derajat
      var mm = glMatrix.mat4.create();
      glMatrix.mat4.translate(mm, mm, [0.0, 0.0, -1.5]);
      
      var mvpLoc = gl.getUniformLocation(program, 'mvpMatrix');
      var mvp = glMatrix.mat4.create();
      glMatrix.mat4.multiply(mvp,vm,mm);
      glMatrix.mat4.multiply(mvp,pm,mvp);
      
      glMatrix.mat4.rotateY(mvp, mvp, theta[yAxis]);
      glMatrix.mat4.rotateX(mvp, mvp, theta[xAxis]);
      glMatrix.mat4.rotateZ(mm, mm, theta[zAxis]);

      gl.uniformMatrix4fv(mvpLoc, false, mvp);

      glMatrix.mat4.translate(mm, mm, [0.0, 0.0, 2.0]);
      gl.uniformMatrix4fv(mmLoc, false, mm);

      // Perhitungan modelMatrix untuk vektor normal
      var nm = glMatrix.mat3.create();
      glMatrix.mat3.normalFromMat4(nm, mm);
      gl.uniformMatrix3fv(nmLoc, false, nm);      
      
      gl.drawArrays(gl.TRIANGLES, 0, cubeVertices.length / 8);
      
      KeyboardInput();
      BounceLetter();
      gl.drawArrays(gl.TRIANGLES, 0, letterVerticesCount);
      var lightPosition = [letterVertices[0], letterVertices[1], letterVertices[2]];
      gl.uniform3fv(lightPositionLoc, lightPosition);
            
      requestAnimationFrame(render); 
    }
    
    // Bersihkan layar jadi hitam
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    // Inisialisasi tekstur
    var texture = gl.createTexture();
    if (!texture) {
      reject(new Error('Gagal membuat objek tekstur'));
    }
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // Sementara warnai tekstur dengan sebuah 1x1 piksel biru
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

    initTexture(function () {
      render();
    });

    // Membuat mekanisme pembacaan gambar jadi tekstur
    function initTexture(callback, args) {
      var imageSource = 'images/AIO.png';
      var promise = new Promise(function(resolve, reject) {
        var image = new Image();
        if (!image) {
          reject(new Error('Gagal membuat objek gambar'));
        }
        image.onload = function() {
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          resolve('Sukses');
        }
        image.src = imageSource;
      });
      promise.then(function() {
        if (callback) {
          callback(args);
        }
      }, function (error) {
        console.log('Galat pemuatan gambar', error);
      });
    }

    function matrixScaling(matrix, size) {
      for (var i = 0; i < matrix.length; i++) {
          matrix[i] *= size
      }

      return matrix
    }

    function matrixTranslating(matrix, x, y, z) {
      for (var i = 0; i < matrix.length / 3; i++) {
          matrix[i * 3] += x
          matrix[i * 3 + 1] += y
          matrix[i * 3 + 2] += z
      }

      return matrix
    }

    function matrixRotating(matrix, derajatPutar, xCore, yCore) {
        degRad = derajatPutar * (Math.PI / 180)
        for (var i = 0; i < matrix.length / 3; i++) {
            var x = matrix[i * 3] - xCore
            var y = matrix[i * 3 + 2] - yCore
            matrix[i * 3] = Math.cos(degRad) * (x) - Math.sin(degRad) * (y) + xCore
            matrix[i * 3 + 2] = Math.sin(degRad) * (x) + Math.cos(degRad) * (y) + yCore
        }
        return matrix
    }

  /////////////////////////////////////////////////////////// Input Handler ////////////////////////////////////////////////////////////////////////

    function onKeyPress(event) {
      if (event.keyCode == 88 || event.keyCode == 120) {
        axis = xAxis;
      } else if (event.keyCode == 89 || event.keyCode == 121) {
        axis = yAxis;
      } else if (event.keyCode == 90 || event.keyCode == 122) {
        axis = zAxis;
      }
    }
    document.addEventListener('keypress', onKeyPress);

    var lastX, lastY, dragging;
    function onMouseDown(event) {
      var x = event.clientX;
      var y = event.clientY;
      var rect = event.target.getBoundingClientRect();
      if (rect.left <= x &&
          rect.right > x &&
          rect.top <= y &&
          rect.bottom > y) {
            lastX = x;
            lastY = y;
            dragging = true;
      }
    }
    function onMouseUp(event) {
      dragging = false;
    }
    function onMouseMove(event) {
      var x = event.clientX;
      var y = event.clientY;
      if (dragging) {
        var factor = 10 / canvas.height;
        var dx = factor * (x - lastX);
        var dy = factor * (y - lastY);
        theta[yAxis] += dx * 0.67;
        theta[xAxis] += dy * 0.67;
      }
      lastX = x;
      lastY = y;
    }
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);

    function GetKey(event){
      keyPress[event.keyCode] = true;
    }

    function GetKeyUp(event){
      keyPress[event.keyCode] = false;
    }

    function KeyboardInput(){

      if(keyPress[87]){
        //w
        vec[1] += nrp;
      }
      else if(keyPress[65]){
        //a
        vec[0] -= nrp;
      }
      else if(keyPress[83]){
        //s
        vec[1] -= nrp;
      }
      else if(keyPress[68]){
        //d
        vec[0] += nrp;
      }
      else if(keyPress[81]){
        //q
        vec[2] -= nrp;
      }
      else if(keyPress[69]){
        //e
        vec[2] += nrp;
      }
    }

    function onKeyPress(event) {
      if (event.keyCode == 88 || event.keyCode == 120) {
        axis = xAxis;
      }
      else if (event.keyCode == 89 || event.keyCode == 121) {
        axis = yAxis;
      }
      else if (event.keyCode == 90 || event.keyCode == 122) {
        axis = zAxis;
      }
    }

    document.addEventListener("keypress", onKeyPress);
    document.onkeydown = GetKey;
    document.onkeyup = GetKeyUp;

  }

})();