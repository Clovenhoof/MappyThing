<!DOCTYPE html>
<html>
    <head>
        <title>Google maps demo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://maps.googleapis.com/maps/api/js?key=<?= getenv('apikey'); ?>" type="text/javascript"></script>
        <script type="text/javascript" src="dist/bundle.js"></script>
    </head>
    <body>
        <main>
            <div class="toolset">
                <a class="fn fn--add" aria-label="Add stuff">
                    <span class="material-icons">add</span>
                    <span class="text">Add location</span>
                </a>
                <div class="filters">
                    <a class="fn fn--open" aria-label="Filter open places">
                        <span class="material-icons">timelapse</span>
                        <span class="text">Currently open</span>
                    </a>
                    <a class="fn fn--favorites" aria-label="Filter favorites">
                        <span class="material-icons">favorite_outline</span>
                        <span class="text">Show favorites</span>
                    </a>
                </div>
                <div class="filters">
                    <select class="fn--keywords"></select>
                    <input placeholder="Search" type="text" class="fn fn--search">
                </div>
            </div>
            <div class="map"></div>
        </main>
    </body>
</html>