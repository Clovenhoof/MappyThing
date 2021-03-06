<?php
global $config;
$config = json_decode(file_get_contents(__DIR__ . '/../config/environment.json'), true);

if(is_file(__DIR__ . '/../config/.env.php'))
    require __DIR__ . '/../config/.env.php';

require __DIR__ . '/../vendor/autoload.php';

use Psr\Http\Message\ResponseInterface as Response;
use PSR\Http\Message\ServerRequestInterface as Request;

use Slim\Factory\AppFactory;
use Slim\Views\PhpRenderer;

use App\Model\Place;
use App\Model\Keyword;

$app = AppFactory::create();
$app->addErrorMiddleware(false,false,false);

// main app
$app->get('/', function($request, $response) {
    $renderer = new PHPRenderer('../src/php/Templates');
    return $renderer->render($response, 'main.php');
});

// place form
$app->get('/form', function($request, $response) {
    $renderer = new PHPRenderer('../src/php/Templates');
    return $renderer->render($response, 'form.php');
});

// edit place form
$app->get('/form/{id}/', function($request, $response, $args) {
    $renderer = new PHPRenderer('../src/php/Templates');
    return $renderer->render($response, 'form.php', (new Place())->fetch(['id' => $args['id']]));
});

// display place view
$app->get('/view/{id}/', function($request, $response, $args) {
    $renderer = new PHPRenderer('../src/php/Templates');
    return $renderer->render($response, 'view.php', (new Place())->fetch(['id' => $args['id']]));
});

// delete confirm view
$app->get('/delete/{id}/', function($request, $response, $args) {
    $renderer = new PHPRenderer('../src/php/Templates');
    return $renderer->render($response, 'delete.php', (new Place())->fetch(['id' => $args['id']]));
});

// search/get place
$app->get('/api/places/', function($request, $response) {
    $place = new Place();
    $response->getBody()->write(json_encode([
        'places' => $place->fetch()
    ]));
    return $response
        ->withHeader('Content-Type', 'application/json');
});

// get specific place
$app->get('/api/places/{id}/', function($request, $response, $args) {
    $place = new Place();
    if($current = $place->fetch(['id' => $args['id']])) {
        $response->getBody()->write(json_encode([
            'places' => $current
        ]));
    }else{
        $response->getBody()->write(json_encode([
            'error' => 'Not found'
        ]));
    }
    return $response
        ->withHeader('Content-Type', 'application/json');
});

// store place
$app->post('/api/places/', function($request, $response) {
    try {
        $post = new Place(json_decode($request->getBody(), true));
        if($post->store()) {
            $response->getBody()->write(json_encode([
                'place' => $post->getValues()
            ]));
            return $response
                ->withHeader('Content-Type', 'application/json');
        }else{
            throw new Exception();
        }
    }
    catch(exception $e) {
        return $response
            ->withStatus(500);
    }
});

// edit place
$app->patch('/api/places/{id}/', function($request, $response, $args) {
    $place = new Place();
    $place->fetch(['id' => $args['id']]);
    $place->setValues(array_replace_recursive(["id" => $args['id']], json_decode($request->getBody(), true)));
    if($place->store()) {
        $response->getBody()->write(json_encode([
            'place' => $place->getValues()
        ]));
        return $response
            ->withHeader('Content-Type', 'application/json');
    }else{
        return $response
            ->withStatus(500);
    }
});

// delete place
$app->delete('/api/places/{id}/', function($request, $response, $args) {
    $post = new Place();
    if($post->delete((int)$args['id']))
        $response->getBody()->write(json_encode([
            'place' => (int)$args['id']
        ]));
        return $response
            ->withHeader('Content-Type', 'application/json');
});

// search/get keywords
$app->get('/api/keyword/', function($request, $response) {
    $keyword = new Keyword();
    $response->getBody()->write(json_encode([
        'keywords' => $keyword->fetch()
    ]));
    return $response
        ->withHeader('Content-Type', 'application/json');
});

// store keyword
$app->post('/api/keyword/', function($request, $response) {
    try {
        $post = new Keyword(json_decode($request->getBody(), true));
        if($post->store()) {
            $response->getBody()->write(json_encode([
                'keyword' => $post->getValues()
            ]));
            return $response
                ->withHeader('Content-Type', 'application/json');
        }else{
            throw new Exception();
        }
    }
    catch(exception $e) {
        return $response
            ->withStatus(500);
    }
});

// update keyword
$app->patch('/api/keyword/', function($request, $response) {
    try {
        $post = new Keyword(json_decode($request->getBody(), true));
        if($post->store()) {
            $response->getBody()->write(json_encode([
                'keyword' => $post->getValues()
            ]));
            return $response
                ->withHeader('Content-Type', 'application/json');
        }else{
            throw new Exception();
        }
    }
    catch(exception $e) {
        return $response
            ->withStatus(500);
    }
});

// delete keyword
$app->delete('/api/keyword/{id}/', function($request, $response, $args) {
    $post = new Keyword();
    if($post->delete($args['id'])) {
        $response->getBody()->write(json_encode([
            'keyword' => $args['id']
        ]));
    }else{
        $response->withStatus(500);
    }
    return $response;
});

$app->run();
?>