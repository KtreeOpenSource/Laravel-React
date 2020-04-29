<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Items extends Model
{
    //
    protected $table = 'items';

    protected $fillable = [
        'name', 'description',
    ];

    public function getRelatedProducts() {
      return $this->hasMany('App\Products', 'item_id', 'id');
    }
}
