<?php

namespace App\Http\Controllers;

use App\Items;
use Illuminate\Http\Request;

class ItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $items = Items::all();
        return response()->json($items);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $item = new Items([
          'name' => $request->get('name'),
          'description' => $request->get('description')
        ]);
        $item->save();


        return response()->json('Item Added Successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Items  $items
     * @return \Illuminate\Http\Response
     */
    public function show(Items $items)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Items  $items
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $item = Items::find($id);
        return response()->json($item);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Items  $items
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $item = Items::find($id);
        $item->name = $request->get('name');
        $item->description = $request->get('description');
        $item->save();


        return response()->json('Item Updated Successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Items  $items
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $item = Items::find($id);
        $item->delete();


        return response()->json('Item Deleted Successfully.');
    }
    /**
     * Get the products of items.
     *
     * @return \Illuminate\Http\Response
     */
     public function getProducts($id)
     {
       $itemProducts = Items::with('getRelatedProducts')->where('id', $id)->first();

       return response()->json($itemProducts);
     }
}
