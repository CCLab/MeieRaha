<div id="layout-page-header">
    <ul id="title"> 
                 <li><a href="?year=<?=$year?>" class="parent">Estonian State Budget <?=$year?></a> 
                     <ul> 
                         <li><a href="?year=<?=(2011+2012-$year)?>">Estonian State Budget <?=(2011+2012-$year)?></a></li> 
                     </ul> 
                 </li>
             </ul><ul id="main-menu"><li><a href="?page=budget" class="<?=$active['budget']?>">Budget</a></li><li><a href="?page=meieraha" class="<?=$active['meieraha']?>">Meieraha</a></li><li><a href="?page=data" class="<?=$active['data']?>">Data</a></li><li><a href="?page=feedback" class="last <?=$active['feedback']?>">Contact</a></li></ul>
</div>

