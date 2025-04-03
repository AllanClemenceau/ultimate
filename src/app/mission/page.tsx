'use client';

export default function MissionPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Sélection de la Mission</h1>
      <p className="text-xl mb-4">
        Choisissez votre mission
      </p>
      
      {/* TODO: Ajouter la grille des missions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg bg-background">
          Mission en construction...
        </div>
      </div>
    </main>
  );
}
