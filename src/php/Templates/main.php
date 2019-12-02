<!DOCTYPE html>
<html>
    <head>
        <title>Google maps demo</title>
        <script src="https://maps.googleapis.com/maps/api/js?key=<?= getenv('apikey'); ?>" type="text/javascript"></script>
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