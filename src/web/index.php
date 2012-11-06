<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?
session_start();
if (isset($_SESSION['lang'])) $lang = $_SESSION['lang'];
else $lang = 'et';
if (isset($_GET['lang'])) $lang = $_GET['lang'];
if (!in_array($lang, array("en","et","pl"))) $lang = "pl";
$_SESSION['lang'] = $lang;

if (isset($_SESSION['year'])) $year = $_SESSION['year'];
else $year = '2012';
if (isset($_GET['year'])) $year = $_GET['year'];
if (!in_array($year, array("2011", "2012", "2013"))) $year = "2013";
$year = intval($year);
$_SESSION['year'] = $year;

$page = 'main';
if (isset($_GET['page'])) $page = $_GET['page'];
if (!in_array($page, array("main", "budget", "meieraha", "data", "feedback"))) $page = "main";
$is_app_page = ($page == 'main');

$active = array("main" => "", "budget" => "", "meieraha" => "", "data" => "", "feedback" => "");
$active[$page] = "active";
$lang_active = array("et" => "", "en" => "", "pl"=>"");
$lang_active[$lang] = "active";

if ($year == '2011') $date_published = '27.02.2011';
else if ($year == '2012') $date_published = '01.10.2012';
else if ($year == '2012') $date_published = '27.09.2012';

include($lang . ".common.inc");


?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?=$lang?>" lang="<?=$lang?>">
<head>
	<title><?=$sitetitle?> › <?=$pagetitle?></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="language" content="<?=$lang?>" />
	<meta name="description" content="" />
	<meta name="keywords" content="" />

        <!-- Facebook Open Graph data -->
	<meta property="og:title" content="Zaprojektuj sw&#xf3;j budzet" />
	<meta property="og:type" content="non_profit" />
	<meta property="og:url" content="http://zaprojektuj.otwartybudzet.pl/" />
	<meta property="og:image" 
	  content="http://zaprojektuj.otwartybudzet.pl/static/img/ccpp_logo_male.jpg" />
	<meta property="og:site_name" content="Otwarty Bud&#x17c;et" />
	<meta property="fb:admins" content="1164067269" />
	
	<!-- Favicon -->
	<link rel="shortcut icon" type="image/x-icon" href="static/img/favicon.ico" />
	<link rel="icon" type="image/x-icon" href="static/img/favicon.ico" />

	<!-- CSS Files -->
	<link href='http://fonts.googleapis.com/css?family=Droid+Sans:regular,bold' rel='stylesheet' type='text/css'>
	<link type="text/css" href="static/css/screen.css" rel="stylesheet" media="screen, projection" />
	<link type="text/css" href="static/css/print.css" rel="stylesheet" media="print" />
	<!--[if lt IE 8]>
		<link href="static/css/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
	<![endif]-->

	<!-- Delfi special -->
	<? if (strpos($_SERVER['REQUEST_URI'], 'delfi')) {
	?>
		<style type="text/css">
		#layout-page-middle.<?=$lang?> {
			background-image: url("../img/background_<?=$lang?>_small.png")
		}
		</style>
	<?
	}?>
	<!-- JS Files -->
	
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js" type="text/javascript"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			// Year selection
			var cssObjS = {
				'border-bottom-left-radius' : '0',
				'-moz-border-radius-bottomleft' : '0'
			}
			
			var cssObjH = {
				'border-bottom-left-radius' : '5px',
				'-moz-border-radius-bottomleft' : '5px'
			}
			  
			$('#title li').hover( 
				function () {
					$('ul', this).slideDown(100);
					$('ul#title li a.parent').css(cssObjS);
				},  
				function () { 
					$('ul', this).slideUp(100);          
					$('ul#title li a.parent').css(cssObjH);
				}
			);		
	});
	</script>
	
	<? if ($is_app_page) { ?>

	<!--[if lt IE 9]>
		<script src="static/js/excanvas.patched.compiled.js"></script>
	<![endif]-->
	
	<script src="static/js/jquery-ui-1.8.13.draggable.min.js"></script>
	<script src="data/<?=$lang?>.0.scales.js"></script>
	<script src="data/<?=$lang?>.<?=$year?>.rules.js"></script>
	<script src="cc/data/<?=$lang?>.<?=$year?>.tulud.js"></script>
	<script src="cc/data/<?=$lang?>.<?=$year?>.kulud.js"></script>
	<script src="static/js/MeieRaha.compiled.js"></script>
	
	<? } ?>
	
</head>
<body>

	<div id="layout-page">
      <? include($lang . ".layout-page-header.inc"); ?>

		<? if ($is_app_page) { ?>
    	<div id="layout-page-middle" class="<?=$lang?>">
			<!-- AppContainer is needed for receiving mouse events from both canvas and labels -->
			<div id="AppContainer" onselectstart="return false;">
				<canvas id="AppCanvas" width="1000" height="550"></canvas>
				<div id="BalanceDisplay" zindex="1000">
					<div id="BudgetValue">0,0 mld</div>
					<div id="ScaleImage" class="norm"></div>
  					<div class="reset">
						<a href="#" id="ResetButton"><?=$reset?></a>
					</div>
 					<div class="share">
						<strong><a href="#" id="ShareButton"><?=$share?></a></strong>
					</div>
				</div>
				<div id="RulesDisplay" zindex="1000">
				</div>
				<div id="HintDisplay"></div>
			</div>
		</div>
		<? } ?>

      <div id="layout-page-language">
        	<a href="?lang=et&page=<?=$page?>" class="<?=$lang_active['pl']?>">PL</a>
        	<a href="?lang=en&page=<?=$page?>" class="<?=$lang_active['en']?>">ENG</a>
      </div>

		<? if ($is_app_page) { ?>

		<? include ($lang . ".layout-page-footer.inc"); ?>

     <div id="layout-page-extras">
        	<div id="compare-link">
            	<div class="icon icon-compare"></div>
            	<p><?=$compare?></p>
			</div>
        	<div id="compare-bubbles">
                <div id="compare-close">
                    <a href="#">–</a>
                </div>
         </div>
     </div>
	  <? } else { include($lang . ".layout-text." . $page . ".inc"); } ?>
	</div>

   <div id="share-address-field" style="text-align:center;position:absolute; top:80px; left:430px;"></div>

  <script type="text/javascript">
     function jsonify () {
       var bubblesArray = new Array();
       var h,i;
       var http = new XMLHttpRequest();

       http.onreadystatechange = function() {
         if (http.readyState == 4) {
           var response = http.responseText;
           document.getElementById("share-address-field").innerHTML="<div style=\"padding:1ex;background:white;\"><div style=\"margin-bottom:0.8ex;\"><p><strong>Adres Twojego projektu budżetu:<strong></p><p><a href=\"/cc/load/"+response+"\">http://zaprojektuj.otwartybudzet.pl/cc/load/"+response+"/</a></div><iframe src=\"http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fzaprojektuj.otwartybudzet.pl%2Fcc%2Fload%2F"+response+"%2F&amp;send=false&amp;layout=button_count&amp;width=450&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;appId=127749530600754\" scrolling=\"no\" frameborder=\"0\" style=\"border:none; overflow:hidden; width:450px; height:21px;\" allowTransparency=\"true\"></iframe></div>";
         };
       };

       h = meieraha.js.Base.instance.bubbleDisplay.bubbleRegistry.bubbles.h
       for (i in h) {

         bubblesArray.push(new Array(h[i].id,h[i]._value ))
       }

       result = 'bubbles='+escape(JSON.stringify(bubblesArray, null, true));

       http.open("POST", "/cc/save/", true);
       http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
       http.setRequestHeader("Content-length", result.length);
       http.setRequestHeader("Connection", "close");
       http.send(result);
     }
  
  </script>
</div>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-35704637-1']);
  _gaq.push(['_setDomainName', 'otwartybudzet.pl']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</body>
</html>
