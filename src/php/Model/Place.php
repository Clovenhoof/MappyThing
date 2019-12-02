<?php
namespace App\Model;

use App\Model\Common;

class Place {
    use Common;
    
    protected static $_fields = [
        'title' => ['string'],
        'description' => ['string'],
        'startHours' => ['string'],
        'startMinutes' => ['string'],
        'endHours' => ['string'],
        'endMinutes' => ['string'],
        'favourite' => ['boolean'],
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
        unset($args['id']);
        
        $results = $this->fetchAll();
        $results[$id] = array_replace_recursive($results[$id], $args);
        
        if(file_put_contents($this->getStorageFileName(), json_encode($results))) {
            $this->setValues($results[$id]);
            return true;
        }else
            return false;
    }
    
    public function fetch($args = null) {
        $results = $this->fetchAll();
        
        if(is_array($args)) {
            if(isset($args['id']) && is_numeric($args['id'])) {
                foreach($results as $key => $row) {
                    if($key == $args['id']) {
                        $results = array_replace_recursive(['id' => $key], $row);
                    }
                }
            }
        }
        
        return $results;
    }
}
