<?php
$configFile = dirname(__FILE__) . '/../../../config/environment.json';
if(is_file($configFile)) {
    $config = json_decode(file_get_contents($configFile), true);
}
?><!DOCTYPE html>
<html>
    <head>
        <title>Google maps demo</title>
        <script src="https://maps.googleapis.com/maps/api/js?key=<?php echo($config['apikey']); ?>" type="text/javascript"></script>
        <script type="text/javascript" src="dist/bundle.js"></script>
    </head>
    <body>
        <main>
            <div class="toolset">
                <a class="material-icons function-add" aria-title="Add stuff">add</a>
            </div>
            <div class="map"></div>
        </main>
    </body>
</html>