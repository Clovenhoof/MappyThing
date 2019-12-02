<div class="view">
    <div class="header">
        <h2 class="title"><?= $title; ?></h2>
        <a class="favorite material-icons"><?= isset($favorite) && $favorite == true ? 'favorite' : 'favorite_border'; ?></a>
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