<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Http\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $users = User::all();

    return response()->json([
        'success' => true,
        'data' => $users
    ], Response::HTTP_OK);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'fullname' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'phone' => 'nullable|string|max:20',
        'role' => 'required|string',
        'password' => 'required|string|min:6',
    ]);

    $validated['password'] = bcrypt($validated['password']);

    $user = User::create($validated);

    return response()->json([
        'success' => true,
        'message' => 'Utilisateur créé avec succès',
        'data' => $user
    ], Response::HTTP_CREATED);
}
    /**
     * Display the specified resource.
     */
   public function show(string $id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'Utilisateur non trouvé'
        ], Response::HTTP_NOT_FOUND);
    }

    return response()->json([
        'success' => true,
        'data' => $user
    ], Response::HTTP_OK);
}
    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, string $id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'Utilisateur non trouvé'
        ], Response::HTTP_NOT_FOUND);
    }

    $validated = $request->validate([
        'name' => 'sometimes|string|max:255',
        'fullname' => 'sometimes|string|max:255',
        'email' => 'sometimes|email|unique:users,email,' . $id,
        'phone' => 'nullable|string|max:20',
        'role' => 'sometimes|string',
        'password' => 'sometimes|string|min:6',
    ]);

    if (isset($validated['password'])) {
        $validated['password'] = bcrypt($validated['password']);
    }

    $user->update($validated);

    return response()->json([
        'success' => true,
        'message' => 'Utilisateur mis à jour avec succès',
        'data' => $user
    ], Response::HTTP_OK);
}

    /**
     * Remove the specified resource from storage.
     */
   public function destroy(string $id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'Utilisateur non trouvé'
        ], Response::HTTP_NOT_FOUND);
    }

    $user->delete();

    return response()->json([
        'success' => true,
        'message' => 'Utilisateur supprimé avec succès'
    ], Response::HTTP_OK);
}
}
