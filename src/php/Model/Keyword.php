<?php
namespace App\Model;

use App\Model\Common;

class Keyword {
    use Common;
    
    protected static $_fields = [
        'id' => ['int'],
        'title' => ['string'],
        'count' => ['int']
    ];
    
    public function __construct($data = null) {
        if(is_array($data)) {
            if(count($data)) {
                $this->setValues($data);
            }
        }
    }
    
    public function resolve(array $categories) {
        $keywords = $this->fetch();
        $indexed = [];
        foreach($keywords as $key => $row) {
            $indexed[$row['id']] = $row;
        }
        $buffer = [];
        foreach($categories as $key => $cat) {
            $buffer[] = $indexed[$cat];
        }
        return $buffer;
    }
    
    public function delete(int $id) {
        $keywords = $this->fetchAll();
        foreach($keywords as $key => $row) {
            if($id == $row['id']) {
                $newCount = $row['count']-1;
                if($newCount == 0) {
                    array_splice($keywords, $key, 1);
                }else{
                    $keywords[$key]['count'] = $newCount;
                }
                break;
            }
        }
        if(file_put_contents($this->getStorageFileName(), json_encode($keywords))) {
            return true;
        }else
            return false;
    }
    
    public function fetch($args = null) {
        $results = $this->fetchAll();
        
        // add possibly searching
        
        return $results;
    }
}
?>