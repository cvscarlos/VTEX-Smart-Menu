#VTEX - Smart Menu
>*Extensões da plataforma VTEX são plugins criados por desenvolvedores de interface ou pelo VTEX Lab (Laboratório de Inovações da VTEX) que podem ser inseridas em sua loja. Existem extensões gratuitas com código aberto -  Open Source - e extensões pagas.  Indicamos que a instalação seja realizada pelos profissionais e empresas certificados pela VTEX. Vale ressaltar que qualquer profissional de CSS, JavaScript e HTML pode também executar esta tarefa.*

----------

##Instalação
Faça o upload para o "Gerenciador do portal" no "Vtex Admin" dos seguintes arquivos:
* smartMenu.min.js

Crie um template no Gerenciador do Portal com o seguinte conteúdo:
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:vtex="http://www.vtex.com.br/2009/vtex-common" xmlns:vtex.cmc="http://www.vtex.com.br/2009/vtex-commerce">
	<head></head>
	<body>
		<vtex:contentPlaceHolder id="Data" />
	</body>
</html>
```
O PlaceHolder desta página deve ser populado com coleções dos produtos que deseja exibir. O título de cada coleção obrigatoriamente tem que ser o mesmo que o nome do menu onde ele deve aparecer.
Exemplo: menu "Homens" o título do controle deve ser "Homens".

Execute o plugin. Como seletor use a `div` gerada pelo controle `<vtex.cmc:departmentNavigator/>`.
```javascript
$(".menu-departamento").smartMenu();
```