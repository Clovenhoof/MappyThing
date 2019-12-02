<div class="view">
    <div class="header">
        <h2 class="title"><?= $title; ?></h2>
        <?php if(isset($favorite) && $favorite == true) { ?>
            <a class="fn-favorite favorited material-icons">favorite</a>
        <?php }else{ ?>
            <a class="fn-favorite material-icons">favorite_border</a>
        <?php } ?>
    </div>
    <p class="description"><?= $description ?></p>
    <div class="open">
        <span class="text">Open</span>
        <span class="startHours"><?= $startHours; ?></span>:<span class="startMinutes"><?= $startMinutes == 0 ? '00' : $startMinutes; ?></span> - <span class="endHours"><?= $endHours; ?></span>:<span class="endMinutes"><?= $endMinutes == 0 ? '00' : $endMinutes; ?></span>
    </div>
</div>
<div class="functions">
    <a class="edit material-icons">edit</a>
    <a class="cancel">Ok</a>
</div>