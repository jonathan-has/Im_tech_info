import React, { useState, useEffect } from 'react';
import { FaEye, FaPenToSquare, FaTrash, FaCheck, FaX, FaXmark } from 'react-icons/fa6';
import { postformations, getFormations } from '../../../services/Dashboard/superadmin/superadminformation';

export const Formations_t = () => {
   // Hooks d'état de la liste et des modales
      const [formations, setFormations] = useState([]);
      const [affichage, setAffichage] = useState(false); // Contrôle la modale d'ajout
      const [affichageVoir, setAffichageVoir] = useState(false); // Contrôle la modale de détails
      const [affichageEdit, setAffichageEdit] = useState(false); // Contrôle la modale d'édition
      const [chargement, setChargement] = useState(false);
  
      // Formation sélectionnée (pour voir ou modifier)
      const [elementSelectionne, setElementSelectionne] = useState(null);
  
      // Formulaire d'ajout
      const [titre, setTitre] = useState('');
      const [categorie, setCategorie] = useState('');
  
      // Formulaire de modification
      const [editTitre, setEditTitre] = useState('');
      const [editCategorie, setEditCategorie] = useState('');
  
      // Notification Pop-up (Toast)
      const [visible, setVisible] = useState(false);
      const [message, setMessage] = useState("");
      const [success, setSuccess] = useState(true);
  
      // Fonction pour déclencher la notification
      const afficherNotification = (msg, estSucces) => {
          setMessage(msg);
          setSuccess(estSucces);
          setVisible(true);
          setTimeout(() => {
              setVisible(false);
          }, 3000);
      };
  
      // Charger les formations depuis l'API
      const chargerFormations = async () => {
          const token = localStorage.getItem('token');
          try {
              const res = await getFormations(token);
              setFormations(res || []);
          } catch (error) {
              afficherNotification("Erreur lors du chargement des formations", false);
          }
      };
  
      useEffect(() => {
          chargerFormations();
      }, []);
  
      // Fonction d'ajout avec génération automatique de la date
      const ajouterFormation = async () => {
          if (!titre || !categorie) {
              afficherNotification("Veuillez remplir le titre et la catégorie !", false);
          } else {
              setChargement(true);
              const token = localStorage.getItem('token');
              
              // Génération automatique de la date au format YYYY-MM-DD
              const dateAutomatique = new Date().toISOString().split('T')[0];
  
              // Appel de la fonction du service avec la date générée
              const res = await postformations(titre, categorie, dateAutomatique, token);
  
              if (res && res.success) {
                  afficherNotification(res.message || "Formation créée avec succès !", true);
                  setTitre('');
                  setCategorie('');
                  setAffichage(false); // Ferme la modale
                  chargerFormations();  // Rafraîchit le tableau
              } else {
                  afficherNotification((res && res.message) || "Erreur lors de la création.", false);
              }
  
              setChargement(false);
          }
      };
  
      // ACTION : Supprimer une formation
      const supprimerFormation = (id, titreFormation) => {
          const nouvelleListe = formations.filter((item) => item.id !== id);
          setFormations(nouvelleListe);
          afficherNotification(`Formation "${titreFormation}" supprimée !`, true);
      };
  
      // ACTION : Ouvrir les détails
      const ouvrirVoir = (item) => {
          setElementSelectionne(item);
          setAffichageVoir(true);
      };
  
      // ACTION : Ouvrir la modification
      const ouvrirEdit = (item) => {
          setElementSelectionne(item);
          setEditTitre(item.titre);
          setEditCategorie(item.categorie);
          setAffichageEdit(true);
      };
  
      // ACTION : Sauvegarder la modification
      const enregistrerModification = () => {
          if (!editTitre || !editCategorie) {
              afficherNotification("Veuillez remplir le titre et la catégorie !", false);
          } else {
              const listeMiseAJour = formations.map((item) => {
                  if (item.id === elementSelectionne.id) {
                      return {
                          ...item,
                          titre: editTitre,
                          categorie: editCategorie
                      };
                  } else {
                      return item;
                  }
              });
  
              setFormations(listeMiseAJour);
              setAffichageEdit(false);
              afficherNotification("Formation mise à jour avec succès !", true);
          }
      };
  
      // Style dynamique du bouton
      let classe;
      if (chargement) {
          classe = 'opacity-50 pointer-events-none md:w-[80%] w-full border text-center items-center m-3 p-3 bg-blue-900 font-bold text-white rounded-md duration-200';
      } else {
          classe = 'opacity-100 md:w-[80%] w-full border text-center items-center m-3 p-3 bg-blue-900 font-bold text-white rounded-md duration-200 cursor-pointer active:scale-95';
      }
  
      // Icône de notification
      let icone;
      if (success) {
          icone = <FaCheck size={20} className="border-2 rounded-2xl text-green-600 border-green-600 p-0.5" />;
      } else {
          icone = <FaX size={20} className="border-2 rounded-2xl text-red-600 border-red-600 p-0.5" />;
      }
  
      // Classe de transition de la notification (Positionnée à GAUCHE)
      let notification_classe;
      if (visible) {
          notification_classe = 'z-50 opacity-100 translate-x-0 transition-all duration-300 fixed top-4 left-4 flex p-3 gap-3 items-center font-bold rounded-xl bg-white text-slate-800 shadow-xl border border-slate-200';
      } else {
          notification_classe = 'z-50 opacity-0 -translate-x-10 transition-all duration-300 fixed top-4 left-4 pointer-events-none flex p-3 gap-3 items-center font-bold rounded-xl bg-white text-slate-800 shadow-xl border border-slate-200';
      }
  
      // Modale d'ajout
      let contenuModale = null;
      if (affichage) {
          contenuModale = (
              <div className='fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
                  <div className='relative w-full max-w-lg bg-slate-800 text-white p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center'>
                      
                      {/* Croix de fermeture */}
                      <button 
                          onClick={() => setAffichage(false)}
                          className='absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-700 transition-colors'
                      >
                          <FaXmark className='text-xl' />
                      </button>
  
                      <h1 className='font-extrabold text-2xl mb-1'>Ajouter une formation</h1>
                      <p className='text-gray-400 mb-4 text-[0.9rem]'>Créer une nouvelle formation</p>
  
                      <div className='w-full flex flex-col items-center'>
                          <input
                              type="text"
                              value={titre}
                              onChange={(e) => setTitre(e.target.value)}
                              placeholder='Nom de la formation (ex: Développement Web)'
                              className='border border-slate-600 bg-slate-900 w-full md:w-[80%] p-2.5 m-2 rounded-lg text-white focus:outline-none focus:border-blue-500'
                          />
                          <input
                              type='text'
                              value={categorie}
                              onChange={(e) => setCategorie(e.target.value)}
                              placeholder='Catégorie (ex: Informatique)'
                              className='border border-slate-600 bg-slate-900 w-full md:w-[80%] p-2.5 m-2 rounded-lg text-white focus:outline-none focus:border-blue-500'
                          />
  
                          {/* Bouton d'action */}
                          <button 
                              onClick={ajouterFormation} 
                              disabled={chargement} 
                              className={classe}
                          >
                              {chargement ? 'Enregistrement...' : 'Ajouter la formation'}
                          </button>
                      </div>
                  </div>
              </div>
          );
      }
  
      // Modale de détails (Voir)
      let contenuModaleVoir = null;
      if (affichageVoir && elementSelectionne) {
          contenuModaleVoir = (
              <div className='fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
                  <div className='relative w-full max-w-md bg-white text-slate-800 p-6 rounded-2xl shadow-2xl flex flex-col items-start'>
                      <button 
                          onClick={() => setAffichageVoir(false)}
                          className='absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors'
                      >
                          <FaXmark className='text-xl' />
                      </button>
  
                      <h1 className='font-extrabold text-2xl mb-4 text-purple-700'>Détails de la formation</h1>
                      
                      <div className='w-full space-y-3 text-left border-t pt-3'>
                          <p><span className='font-bold text-slate-600'>Titre :</span> {elementSelectionne.titre}</p>
                          <p><span className='font-bold text-slate-600'>Catégorie :</span> {elementSelectionne.categorie}</p>
                          <p><span className='font-bold text-slate-600'>Date d'ajout :</span> {elementSelectionne.date_creation || elementSelectionne.duree || 'N/A'}</p>
                      </div>
  
                      <button 
                          onClick={() => setAffichageVoir(false)} 
                          className='w-full mt-6 p-2.5 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900 transition-colors'
                      >
                          Fermer
                      </button>
                  </div>
              </div>
          );
      }
  
      // Modale de modification (Edit)
      let contenuModaleEdit = null;
      if (affichageEdit && elementSelectionne) {
          contenuModaleEdit = (
              <div className='fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
                  <div className='relative w-full max-w-lg bg-slate-800 text-white p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center'>
                      <button 
                          onClick={() => setAffichageEdit(false)}
                          className='absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-700 transition-colors'
                      >
                          <FaXmark className='text-xl' />
                      </button>
  
                      <h1 className='font-extrabold text-2xl mb-1'>Modifier la formation</h1>
                      <p className='text-gray-400 mb-4 text-[0.9rem]'>Mettre à jour les informations</p>
  
                      <div className='w-full flex flex-col items-center'>
                          <input
                              type="text"
                              value={editTitre}
                              onChange={(e) => setEditTitre(e.target.value)}
                              placeholder='Nom de la formation'
                              className='border border-slate-600 bg-slate-900 w-full md:w-[80%] p-2.5 m-2 rounded-lg text-white focus:outline-none focus:border-blue-500'
                          />
                          <input
                              type='text'
                              value={editCategorie}
                              onChange={(e) => setEditCategorie(e.target.value)}
                              placeholder='Catégorie'
                              className='border border-slate-600 bg-slate-900 w-full md:w-[80%] p-2.5 m-2 rounded-lg text-white focus:outline-none focus:border-blue-500'
                          />
  
                          <button 
                              onClick={enregistrerModification} 
                              className='opacity-100 md:w-[80%] w-full border text-center items-center m-3 p-3 bg-amber-600 font-bold text-white rounded-md duration-200 cursor-pointer active:scale-95'
                          >
                              Enregistrer les modifications
                          </button>
                      </div>
                  </div>
              </div>
          );
      }
  
      // Gestion de l'affichage de la liste sans opérateur ternaire
      let listeFormations = null;
      if (formations.length === 0) {
          listeFormations = (
              <div className='p-4 text-center text-gray-500 border-b'>Aucune formation trouvée.</div>
          );
      } else {
          listeFormations = formations.map((item, index) => (
              <div key={item.id || index} className='p-3 rounded-md border-b border-gray-100 hover:bg-slate-50 grid grid-cols-7 items-center text-sm transition-colors'>
                  <div className='col-span-3 font-bold text-slate-900'>{item.titre}</div>
                  <div className='col-span-2 inline-block text-slate-700 px-2.5 py-1 rounded-full text-md'>
                      {item.categorie}
                  </div>
                  <div className='col-span-1 text-gray-500'>{item.date_creation || item.duree || 'N/A'}</div>
                  <div className='col-span-1 flex items-center justify-end gap-3 text-gray-500'>
                      <div 
                          onClick={() => ouvrirVoir(item)} 
                          className='cursor-pointer hover:text-blue-600 active:scale-95 transition-all p-1'
                          title="Voir"
                      >
                          <FaEye />
                      </div>
                      <div 
                          onClick={() => ouvrirEdit(item)} 
                          className='cursor-pointer hover:text-amber-600 active:scale-95 transition-all p-1'
                          title="Modifier"
                      >
                          <FaPenToSquare />
                      </div>
                      <div 
                          onClick={() => supprimerFormation(item.id, item.titre)} 
                          className='cursor-pointer hover:text-red-600 active:scale-95 transition-all p-1'
                          title="Supprimer"
                      >
                          <FaTrash className='text-red-600' />
                      </div>
                  </div>
              </div>
          ));
      }
  
      return (
          <main className='relative m-7 col-span-6 font-sans text-slate-800'>
  
              {/* POP-UP DE NOTIFICATION (TOAST À GAUCHE) */}
              <div className={notification_classe}>
                  {icone} {message}
              </div>
  
              {/* MODALES D'INTERACTION */}
              {contenuModale}
              {contenuModaleVoir}
              {contenuModaleEdit}
  
              {/* EN-TÊTE DE LA PAGE */}
              <div className='w-full flex items-center justify-between mb-4'>
                  <div className='font-extrabold text-xl'>Mes Formations</div>
                  <div
                      className='p-2.5 bg-purple-600 hover:bg-purple-700 rounded-md text-white duration-200 active:scale-95 cursor-pointer font-medium shadow-md'
                      onClick={() => setAffichage(true)}
                  >
                      + Nouvelle formation
                  </div>
              </div>
  
              {/* EN-TÊTE DU TABLEAU */}
              <div className='bg-gray-200 p-3 rounded-md mt-2 grid grid-cols-7 font-bold text-black-700 text-sm'>
                  <div className='col-span-3'>Titres</div>
                  <div className='col-span-2'>Catégories</div>
                  <div className='col-span-1'>Date d'ajout</div>
                  <div className='col-span-1 text-right pr-2'>Actions</div>
              </div>
  
              {/* LISTE DYNAMIQUE DES FORMATIONS */}
              {listeFormations}
  
          </main>
      );
};
