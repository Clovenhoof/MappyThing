<?php
namespace App\Model;

trait Common {
    protected $_values = [];
    
    public function getValues() {
        return $this->_values;
    }
    
    public function setValues(array $values) {
        foreach($values as $key => $value) {
            if(in_array($key, array_keys($this::$_fields)))
                $this->setValue($key, $value);
        }
    }
    
    public function store() {
        $dataDir = __DIR__ . '/../../../' . $GLOBALS['config']['dataDir'];

        if(!is_dir($dataDir))
            mkdir($dataDir, 0775, true);

        $class = explode('\\', get_class($this));
        $class = strtolower($class[count($class) - 1]);
        
        $oldData = $this->fetchAll();
        array_push($oldData, $this->getValues());
        
        if(file_put_contents($this->getStorageFileName(), json_encode($oldData))) {
            $this->setValue('id', count($oldData) - 1);
            return true;
        }else
            return false;
    }
    
    public function delete(int $id) {
        $results = $this->fetchAll();
        array_splice($results, $id, 1);
        
        if(file_put_contents($this->getStorageFileName(), json_encode($results))) {
            return true;
        }else
            return false;
    }
    
    protected function fetchAll() {
        return json_decode(file_get_contents($this->getStorageFileName()),true) ?? [];
    }
    
    protected function getStorageFileName() {
        $class = explode('\\', get_class($this));
        $class = strtolower($class[count($class) - 1]);
        
        return __DIR__ . '/../../../' . $GLOBALS['config']['dataDir'] . '/' . $class . '.json';
    }
    
    protected function storeFile($data) {
    }
    
    protected function getValue(string $key) {
        if(isset($this->$_values[$key]))
            return $this->$_values[$key];
        else
            return null;
    }
    
    protected function setValue(string $key, $value) {
        $this->_values[$key] = $value;
    }
}
?>