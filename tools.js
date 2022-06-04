var tools = {
	loader: document.getElementById('loader-bg'),

	addClass: function(element, classN){
	    var classString = element.className;
	    var newClass = classString.concat(" "+classN);
	    element.className = newClass;
	},
	toggleClass: function(element, classN){
	    if (element.classList) { 
	      element.classList.toggle(classN);
	    } else {
	      // For IE9
	      var classes = element.className.split(" ");
	      var i = classes.indexOf(classN);

	      if (i >= 0) 
	        classes.splice(i, 1);
	      else 
	        classes.push(classN);
	        element.className = classes.join(" "); 
	    }
	},
	getImageWeight: function bytesToSize(bytes) {
	   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	   if (bytes == 0) return '0 Byte';
	   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
	},
	ReadImage: function(index, file, box, callback){
	    var reader = new FileReader();
	    reader.onload = function (e) {
	    	var image = e.target.result;
	        var s = image.split("base64");
	        var imageData = "data:image/jpeg;base64" + s[1];
	    	callback(index ,imageData, box);
	    };
	    reader.readAsDataURL(file);
	},
	CPromise: function(fn, callback){
		return new Promise(function(resolve, reject){
			fn(resolve, reject);
		}).then(function(result){
			console.log(result);
			callback(result);
		}).catch(function(error){
			console.log(error);
		});
	},
	hasClass: function(element, classN) {
		var classes = element.className.split(" ");
		var i = classes.indexOf(classN);
		return (i >= 0);
  	},
	removeClass: function(element, classN){
/*		var ce = document.getElementsByClassName(classN);
		for(var h = 0; h < ce.length; h++){*/
			this.toggleClass(element, classN);
		//}
	},
	XHR: function(data, node, callback, json){
		console.log(json, data);
		var request = new XMLHttpRequest();
		request.onreadystatechange = function()
		{
			if (request.readyState == 4 && request.status == 200)
			{
				return callback(request);
			}
		}
		request.open('POST', './api/'+node, true);
		if(json){
			request.setRequestHeader("Content-Type", "application/json");
			request.send(data);
		}else{
			var _data = new FormData();
			for(x in data){
				_data.append(x, data[x]);
			}
			request.send(_data);
		}
		//request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
	},
	ValidateFormFields: function(form){
		//loop ._validate
		//uses .birth for age validation .number for numbers validation
		this.info = {};
		this.submit_product = true;

		var flag = 1;
		var fields = form.getElementsByClassName("validate");
		for(var h = 0; h < fields.length; h++){
			var field = fields[h];

			var _val = field.value;

			var _type = field.getAttribute("type");
			var _name = field.getAttribute("name");
			if(_name != null){
				if(_type == "radio"){
					if(field.checked){
					
						this.info[_name] = _val;
					}
				}else if(_type == "file"){
					this.info[_name] = field.files[0];
				}else if(_type == "checkbox"){
					this.info[_name] = (field.checked?1:0);
				}else{
				
					this.info[_name] = _val;
				}

			}
			if(_val.length == 0){
				if(!this.hasClass(field, 'optional')){
					if(_type == "text"){
						field.style.border = "1px solid red";
					}else if(_type == "file"){
						this.Popup("Falta imágen", "red");
					}else{
						field.style.border = "1px solid red";
					}
					this.submit_product = false;
				}
				
			}else{
				field.style.boxShadow = "";
			}

			//FOR TYC ONLY
			if(_type == "checkbox" && _name == "tyc"){
				if(!field.checked){
					field.style.boxShadow = "inset 0px 0px 4px 2px rgba(255,0,0,1)";
					this.submit_product = false;
				}else{
					field.style.boxShadow = "";
				}
			}
		}
		return {
			valid: this.submit_product,
			information: this.info
		};
	},
	CheckPassword: function(pass1, pass2){
		return (pass1 == pass2);
	},
	ShowLoader: function(msg){
		if(msg != null){
			this.loader.childNodes[0].childNodes[0].innerHTML = msg;
		}
		this.loader.style.display = "block";
	},
	HideLoader: function(){
		this.loader.childNodes[0].childNodes[0].innerHTML = "";
		this.loader.style.display = "none";
	},
	Popup: function(text, bgcolor){
	    var wh = window.innerHeight;
	    var popUp = document.createElement('div');
	    popUp.style.zIndex = "99";
	    popUp.id = "Popup";
	    popUp.style.width = "100%";
	    popUp.style.top = "0px";
	    popUp.style.height = wh + "px";
	    popUp.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
	    popUp.style.boxSizing = "border-box";
	    popUp.style.position = "fixed";
	    popUp.innerHTML = '<div class="c popUp" style="margin:0 auto; max-width: 500px; width:80%; padding:25px; background-color:'+bgcolor+';text-align:center;color:white;font-size:24px">'+text+'</div>';
	    document.body.appendChild(popUp);
	    setTimeout(function(){
	      //this.addClass(popUp, "opacityDown");
	      setTimeout(function(){
	        document.body.removeChild(popUp);
	      }, 3000);
	    }.bind(this), 100);
	  }
};
