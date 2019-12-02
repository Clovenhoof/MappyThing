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
                <a class="fn-add" aria-title="Add stuff">
                    <span class="material-icons">add</span>
                    <span class="text">Add location</span>
                </a>
            </div>
            <div class="map"></div>
        </main>
    </body>
</html>