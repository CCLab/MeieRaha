<div id="layout-page-header">
    <ul id="title"> 
                 <li><a href="?year=<?=$year?>" class="parent">Eesti Eelarve <?=$year?></a> 
                     <ul> 
                         <li><a href="?year=<?=(2012+2011-$year)?>">Eesti Eelarve <?=(2012+2011-$year)?></a></li> 
                     </ul> 
                 </li>
             </ul><ul id="main-menu"><li><a href="?page=budget" class="<?=$active['budget']?>">Mis on eelarve</a></li><li><a href="?page=meieraha" class="<?=$active['meieraha']?>">Meieraha.eu</a></li><li><a href="?page=data" class="<?=$active['data']?>">Andmed</a></li><li><a href="?page=feedback" class="last <?=$active['feedback']?>">Kontakt</a></li></ul>
</div>

