<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class FormationController extends Controller
{
    // GET /api/formations
    public function index()
    {
        $formations = Formation::all();

        return response()->json([
            'success' => true,
            'data' => $formations
        ], Response::HTTP_OK);
    }

    // POST /api/formations
   public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'image_url' => 'nullable|string',
        'categorie' => 'required|string|max:255',
    ]);

    $formation = Formation::create($validated);

    return response()->json([
        'success' => true,
        'message' => 'Formation créée avec succès',
        'data' => $formation
    ], Response::HTTP_CREATED);
}

    // GET /api/formations/{id}
    public function show(string $id)
{
    $formation = Formation::find($id);

    if (!$formation) {
        return response()->json([
            'success' => false,
            'message' => 'Formation non trouvée'
        ], Response::HTTP_NOT_FOUND);
    }

    return response()->json([
        'success' => true,
        'data' => $formation
    ], Response::HTTP_OK);
}

    // PUT /api/formations/{id}
   public function update(Request $request, string $id)
{
    $formation = Formation::find($id);

    if (!$formation) {
        return response()->json([
            'success' => false,
            'message' => 'Formation non trouvée'
        ], Response::HTTP_NOT_FOUND);
    }

    $validated = $request->validate([
        'title' => 'sometimes|string|max:255',
        'description' => 'sometimes|string',
        'image_url' => 'nullable|string',
        'categorie' => 'sometimes|string|max:255',
    ]);

    $formation->update($validated);

    return response()->json([
        'success' => true,
        'message' => 'Formation mise à jour avec succès',
        'data' => $formation
    ], Response::HTTP_OK);
}

    // DELETE /api/formations/{id}
    public function destroy(string $id)
{
    $formation = Formation::find($id);

    if (!$formation) {
        return response()->json([
            'success' => false,
            'message' => 'Formation non trouvée'
        ], Response::HTTP_NOT_FOUND);
    }

    $formation->delete();

    return response()->json([
        'success' => true,
        'message' => 'Formation supprimée avec succès'
    ], Response::HTTP_OK);
}
}