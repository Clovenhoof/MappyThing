<?php
namespace App\Model;

use App\Model\Common;
use App\Model\Keyword;

class Place {
    use Common;
    
    protected static $_fields = [
        'id' => ['int'],
        'title' => ['string'],
        'description' => ['string'],
        'startHours' => ['string'],
        'startMinutes' => ['string'],
        'endHours' => ['string'],
        'endMinutes' => ['string'],
        'favorite' => ['boolean'],
        'keywords' => ['array'],
        'lat' => ['float'],
        'lng' => ['float']
    ];
    
    public function __construct($data = null) {
        if(is_array($data)) {
            if(count($data)) {
                $this->setValues($data);
            }
        }
    }
    
    public function update($args = null) {
        if(!isset($args['id']))
            return false;
        
        $id = (int)$args['id'];
        
        $results = $this->fetchAll();
        
        foreach($results as $key => $row) {
            if($row['id'] == $id) {
                $row = array_replace_recursive($row, $args);
                break;
            }
        }
        
        if(file_put_contents($this->getStorageFileName(), json_encode($results))) {
            $this->setValues($row);
            return true;
        }else
            return false;
    }
    
    public function fetch($args = null) {
        $results = $this->fetchAll();
        
        if(is_array($args)) {
            if(isset($args['id']) && is_numeric($args['id'])) {
                foreach($results as $key => $row) {
                    if($row['id'] == $args['id']) {
                        if(is_array($row['keywords'])) {
                            if(count($row['keywords'])) {
                                $row['keywords'] = (new Keyword())->resolve($row['keywords']);
                            }
                        }
                        $results = $row;
                        break;
                    }
                }
            }
        }
        
        return $results;
    }
}
?>