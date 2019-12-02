<h2><?= isset($id) ? 'Edit location' : 'Add location' ?></h2>
<form class="grid">
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
</form>
<div class="functions">
    <?php if(isset($id)) {
        ?><a class="delete">Delete</a><?php
    } ?>
    <a class="cancel">Cancel</a>
    <a class="save">Save</a>
</div>