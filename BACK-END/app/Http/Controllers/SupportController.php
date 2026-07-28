<?php

namespace App\Http\Controllers;

use App\Models\Support;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SupportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $supports = Support::with(['formation', 'user'])->get();

    return response()->json([
        'success' => true,
        'data' => $supports
    ], Response::HTTP_OK);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'file_url' => 'required|string',
        'type' => 'required|string|max:50',
        'formation_id' => 'required|exists:formations,id',
        'user_id' => 'required|exists:users,id',
    ]);

    $support = Support::create($validated);

    return response()->json([
        'success' => true,
        'message' => 'Support créé avec succès',
        'data' => $support
    ], Response::HTTP_CREATED);
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
{
    $support = Support::with(['formation', 'user'])->find($id);

    if (!$support) {
        return response()->json([
            'success' => false,
            'message' => 'Support non trouvé'
        ], Response::HTTP_NOT_FOUND);
    }

    return response()->json([
        'success' => true,
        'data' => $support
    ], Response::HTTP_OK);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $support = Support::find($id);

    if (!$support) {
        return response()->json([
            'success' => false,
            'message' => 'Support non trouvé'
        ], Response::HTTP_NOT_FOUND);
    }

    $validated = $request->validate([
        'title' => 'sometimes|string|max:255',
        'description' => 'nullable|string',
        'file_url' => 'sometimes|string',
        'type' => 'sometimes|string|max:50',
        'formation_id' => 'sometimes|exists:formations,id',
        'user_id' => 'sometimes|exists:users,id',
    ]);

    $support->update($validated);

    return response()->json([
        'success' => true,
        'message' => 'Support mis à jour avec succès',
        'data' => $support
    ], Response::HTTP_OK);
}
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
{
    $support = Support::find($id);

    if (!$support) {
        return response()->json([
            'success' => false,
            'message' => 'Support non trouvé'
        ], Response::HTTP_NOT_FOUND);
    }

    $support->delete();

    return response()->json([
        'success' => true,
        'message' => 'Support supprimé avec succès'
    ], Response::HTTP_OK);
}
}
