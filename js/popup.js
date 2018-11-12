		

		// 1.正文和标题
		// 2.确定和关闭之后的回调函数   
		// 3.宽高
		// 4.位置
		// 5.当弹出层出现时要不要让页面可以滚动   ------
		// 6.遮罩层的不透明度
		// 7.出现/隐藏的方式
		// 8.过渡时间
		// 9.按钮
		// 10.X
		// 11.固定定位还是绝对定位

	function graceBox(opt){
			var title = opt.title;
			var details = opt.details;
			var maskOpactiy = opt.maskOpactiy || 0.2;
			var width = opt.width || 300;
			var height = opt.height || "auto";
			var position = opt.position || "middle";
			var animateMethod = opt.animateMethod || "defult";
			var fix = opt.fix || false;
			var btn = opt.btn || ["确定","取消"]
			var animationTime = opt.animationTime || 15;
			var body = document.getElementsByTagName("body")[0];

			/* 初始化页面的高度 防止遮罩层高度不满屏*/
			document.getElementsByTagName("html")[0].style.height = '100%';
			document.getElementsByTagName("body")[0].style.height = '100%';
			var bodyHeight = document.documentElement.offsetHeight;
			var bodyWidth = document.documentElement.offsetWidth;
			/* 创建并初始化遮罩层的样式 */ 
				var mask = document.createElement("div");
				body.appendChild(mask);
				mask.style.position = "absolute";
				mask.style.height = document.getElementsByTagName("body")[0].scrollHeight  + "px";
				mask.style.width = bodyWidth + "px";
				mask.style.backgroundColor = "rgba(0,0,0," + maskOpactiy + ")";
				mask.style.top = 0;
				mask.style.left = 0;
			/* 弹出层部分 */
			var popup = document.createElement("div");
			popup.id = "popup";
			body.appendChild(popup);
			/* 生成弹出层内部DOM结构 */ 
			var h2 = document.createElement("h2");
			var p = document.createElement("p");
			popup.appendChild(h2);
			popup.appendChild(p);
			/* 为弹出层内部内容赋值 */
			h2.innerHTML = title;
			/* 判断details数据类型 */
			if(typeof details === "string"){
				p.innerHTML = details;
			}
			if(details.nodeType === 1){
				// 插入元素进入正文
				p.appendChild(details)
			}
			//兼容jQuery对象
			if(typeof details === "object" && "addClass" in details){
				p.appendChild(details[0])
			}
			/* 初始化弹出层样式 */
			popup.style.width = width + "px";
			popup.style.height = height;
			
			// 根据参数fix判断定位方式
			popup.style.position = "absolute";
			(fix == "fixed") && (popup.style.position = "fixed")
			if(position == "middle"){
				popup.style.left = (bodyWidth - popup.offsetWidth) / 2 + "px";
				popup.style.top = (bodyHeight - popup.offsetHeight) / 2 + "px";
			}
			if(position == "top"){
				popup.style.left = (bodyWidth - popup.offsetWidth) / 2 + "px";
				popup.style.top = 20 + "px";
			}
			if(position == "bottom"){
				popup.style.left = (bodyWidth - popup.offsetWidth) / 2 + "px";
				popup.style.bottom = 20 + "px";
			}
			if(typeof position == "object"){
				popup.style.left = position.x + "px";
				popup.style.top = position.y + "px";
			}
			popup.style.backgroundColor = "#ffffff";
			popup.style.boxShadow = "0 0 5px #666";
			popup.style.border = "3px solid #e3e3e3";
			h2.style.fontSize = "16px";
			h2.style.lineHeight = "32px";
			h2.style.textIndent = "1em";
			h2.style.color = "#333";
			h2.style.fontWeight = "normal";
			h2.style.backgroundColor = "#e3e3e3";
			h2.style.position = "relative";
			p.style.fontSize = "14px"
			p.style.padding = "25px 10px";
			/* 弹出层淡入动画 */
			// 动画执行模式 滑动
			if(animateMethod == "defult"){
				popup.style.opacity = 0;
				popup.style.marginTop = "20px";
				var animation = setInterval(function(){
					var o = Number(popup.style.opacity);
					var mt = parseInt(popup.style.marginTop)
					if(o >= 1){
						clearInterval(animation);
						return;
					}
					popup.style.opacity = o + 0.02;
					if(mt > 0){
						popup.style.marginTop = mt - 1 + "px";
					}
				},animationTime);
			}
			// 动画执行模式 缩放
			if(animateMethod == "zoom"){
				popup.style.transform = "scale(0)"
				var n = 0;
				var animation = setInterval(function(){
					n += 0.03 + (1 - n) / 20;
					popup.style.transform = "scale(" + n + ")";
					if(n >= 1){
						clearInterval(animation);
						popup.style.transform = "scale(1)"
					}
				},animationTime);
			}
			if(!(opt.isCloseBtn === false)){
				/* 关闭弹出层按钮 */
				var close = document.createElement("div")
				h2.appendChild(close);
				close.innerHTML = "x"
				close.style.float = "right"
				close.style.cursor = "pointer"
				close.style.paddingRight = "15px"
				close.onclick = function(){
					/* 删除遮罩层 */ 
					body.removeChild(mask);
					/* 淡出弹出层 */ 
					if(animateMethod == "defult"){
						var animation = setInterval(function(){
							var o = Number(popup.style.opacity);
							var mt = parseInt(popup.style.marginTop)
							if(o <= 0){
								clearInterval(animation);
								body.removeChild(popup)
								return;
							}
							popup.style.opacity = o - 0.06;
							if(mt < 10){
								popup.style.marginTop = mt - 1 + "px";
							}
						},15);
					}
					/* 缩放隐藏弹出层 */ 
					if(animateMethod == "zoom"){
						var animation = setInterval(function(){
							n -= 0.03 + (1 - n) / 20;
							popup.style.transform = "scale(" + n + ")";
							if(n <= 0){
								clearInterval(animation);
								body.removeChild(popup)
							}
						},15);
					}
				}
			}
			// 生成插入按钮DOM节点开始 
			
			// 生成插入按钮包裹元素
			var btnWrap = document.createElement("p");
			popup.appendChild(btnWrap);
			btnWrap.style.textAlign = "center";		
			btnWrap.style.marginBottom = "15px";
			//生成插入按钮节点
			for(var i = 0; i < btn.length; i++){
				var o = document.createElement("button");
				o.innerHTML = btn[i];
				btnWrap.appendChild(o);
				//设置按钮样式
				o.style.marginRight = "10px"
				// 设置按钮单击事件与回调
				if(o.innerHTML == "确定"){
					o.className = "btn-confirm";
					o.onclick = function(){
						close.click();
						return true;
					}
				}
				if(o.innerHTML == "取消"){
					o.className = "btn-cancel";
					o.onclick = function(){
						close.click();
						return false;
					}
				}
			}
			// 生成插入按钮DOM节点结束
		}