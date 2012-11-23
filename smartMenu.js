/**
* Vtex Smart Menu
* @author Carlos Vinicius
* @version 2.0
* @date 2011-11-23
*/
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E","\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/g,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
jQuery.fn.smartMenu=function(opts)
{
	var $this=jQuery(this);
	if($this.length<1) return $this;

    var defaults=
	{
		// Url da página que contém as coleções
		productsUrl:"http://"+document.location.host+"/menu",
		// Classe onde o produto será inserido
		productClass:".vtexsm-product",
		// Define se o menu será formatado pelo plugin
		noFormatMenu:false,
		// Callback após executar as funções do plugin, isso não inclui requisições assincronas e suas derivações.
		callback:function(){}
	};
    var options=jQuery.extend(defaults, opts),
		$empty=jQuery(""),
		_console="object"===typeof(console);

	var fn=
	{
		products:{},
		exec:function()
		{
			fn.formatMenu();
			fn.getProducts();
		},
		getProducts:function()
		{
			jQuery.ajax({
				url:options.productsUrl,
				dataType:"html",
				success:fn.prodSuccess,
				error:fn.prodError
			});
		},
		prodSuccess:function(data)
		{
			var $d=jQuery(data),
				shelf=$d.filter("div:not(.ajax-content-loader)");
			
			// Reportando erro
			if(shelf.length<1){if(_console) console.log("[Smart Menu - Erro] Não foram encontradas prateleiras no retorno da requisição Ajax."); return;}
		
			shelf.each(function(){
				var $t=jQuery(this),
					h2=$t.find(">h2");
				if(h2.length<1) return;
				
				var ul=h2.next("ul")||$empty,
					h2Txt=h2.text().trim();
					
				// Reportando erro
				if(h2Txt.length<1){if(_console) console.log("[Smart Menu - Erro] O  “h2” não possui texto"); return;}
				if(ul.length<1){if(_console) console.log("[Smart Menu - Erro] Não foi possível obter a “ul” contendo os produtos\n para o “h2”: “"+h2Txt+"”"); return;}
				
				fn.products[h2Txt.replaceSpecialChars().replace(/\s/g,"-").toLowerCase()]=ul;
			});

			fn.insertInMenu();
		},
		prodError:function()
		{
			if(_console) console.log("[Smart Menu - Erro] Não foi possível obter a página com os produtos do menu");
		},
		insertInMenu:function()
		{
			$this.each(function(){
				jQuery(this).find("h3").each(function(){
					var t=jQuery(this),
						tTxt=t.text().trim(),
						prodElem=t.parent().find(options.productClass);
					
					// Reportando erro
					if(prodElem.length<1){if(_console) console.log("[Smart Menu - Alerta] Não foi possível encontrar o elemento que recebe o\nproduto dentro do menu\n("+prodElem.selector+"). A execução do plugin para por aqui!"); return;}
					if(tTxt.length<1){if(_console) console.log("[Smart Menu - Erro] O  “h3” (tít. menu) não possui texto."); return;}
					
					var id=tTxt.replaceSpecialChars().replace(/\s/g,"-").toLowerCase();
					// reportando erro
					if(typeof fn.products[id]!="object"){if(_console) console.log("[Smart Menu - Alerta] Não foi possível encontrar a vitrine\ncorrespondente ao título: “"+tTxt+"”"); return;}
					
					prodElem.append(fn.products[id]);
				});
			});
		},
		formatMenu:function()
		{
			if(options.noFormatMenu) return;
			
			var m,ul,i,h3;
			
			m=$this;
			ul=$("<ul class='menu2Ul'></ul>");
			i=0;
			
			h3=m.find(">h3").each(function(){
				var $t,li,subMenu,div,wrap;
				
				$t=$(this);
				li=$("<li class='ind"+i+"'><div class='menuHorizOverflow3'></div></li>");
				subMenu=$t.find("+ul");
				div=$("<div class='menu2UlWrap'></div>");
				wrap=$('<div class="menu2UlWrap2"><div class="shelfInMenu vtexsm-product"></div></div>');
				
				subMenu.prependTo(wrap);
				wrap.appendTo(div);
				div.appendTo(li);
				$t.prependTo(li);
				li.appendTo(ul);
				
				i++;
			});
			
			ul.appendTo(m);
			ul.find(">li:last").addClass("last");
			
			log("Não foi encontrado o elemento “H3”. Seletor: "+h3.selector);
		}
	};
	
	fn.exec();
	options.callback();
	return $this;
};