<h2><?= isset($id) ? 'Edit location' : 'Add location' ?></h2>
<form class="grid" name="place">
    <?php if(isset($id)) {
        ?><input type="hidden" name="id" value="<?= $id; ?>"><?php
    } ?>
    <input type="text" name="title" value="<?= isset($title) ? $title : null; ?>" placeholder="Enter a title"/>
    <textarea name="description" placeholder="Enter a description"><?= isset($description) ? $description : null; ?></textarea>
    <div class="opening-hours">
        <span class="label">Opens</span>
        <input type="number" name="startHours" value="<?= isset($startHours) ? $startHours : 8; ?>" max="23" min="0"/>
        <input type="number" name="startMinutes" value="<?= isset($startMinutes) ? $startMinutes : 0; ?>" max="50" min="0" step="10"/>
        <span class="label">Closes</span>
        <input type="number" name="endHours" value="<?= isset($endHours) ? $endHours : 16; ?>" max="23" min="0"/>
        <input type="number" name="endMinutes" value="<?= isset($endMinutes) ? $endMinutes : 0; ?>" max="50" min="0" step="10"/>
    </div>
    <div class="keywords">
        <input class="keyword-input" type="hidden" name="keywords"/>
        <div class="selected">
            <?php
                if(isset($keywords)) {
                    if(is_array($keywords)) {
                        if(count($keywords)) {
                            foreach($keywords as $keyword) {
                                ?><span data-id="<?= $keyword['id']; ?>"><?= $keyword['title']; ?></span><?php
                            }
                        }
                    }
                }
            ?>
        </div>
        <input class="keyword-selector" placeholder="Add keyword" type="text"/>
    </div>
</form>
<div class="functions">
    <?php if(isset($id)) {
        ?><a class="fn-delete" aria-label="Delete"><i class="material-icons">close</i></a><?php
    } ?>
    <?php if(isset($id)) {
        ?><a class="fn-move" aria-label="Move"><i class="material-icons">zoom_out_map</i></a><?php
    } ?>
    <a class="fn-save" aria-label="Ok"><i class="material-icons">check</i></a>
</div>