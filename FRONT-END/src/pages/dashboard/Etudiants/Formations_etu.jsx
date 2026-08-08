import React, { useState, useEffect } from 'react';
import { FaEye, FaPenToSquare, FaTrash, FaCheck, FaX, FaXmark } from 'react-icons/fa6';
import { postformations, getFormations } from '../../../services/Dashboard/superadmin/superadminformation';

export const Formations_etu = () => {
// Hooks d'état de la liste et des modales
      const [formations, setFormations] = useState([]);
      const [chargement, setChargement] = useState(false);
  
      // Formation sélectionnée (pour voir ou modifier)
      const [elementSelectionne, setElementSelectionne] = useState(null);
  
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
      // Gestion de l'affichage de la liste
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
              </div>
          ));
      }
      return (
          <main className='relative m-7 col-span-6 font-sans text-slate-800'>
              {/* POP-UP DE NOTIFICATION (TOAST À GAUCHE) */}
              <div className={notification_classe}>
                  {icone} {message}
              </div>
              {/* EN-TÊTE DE LA PAGE */}
              <div className='w-full flex items-center justify-between mb-4'>
                  <div className='font-extrabold text-xl'>Mes Formations</div>
              </div>
              {/* EN-TÊTE DU TABLEAU */}
              <div className='bg-gray-200 p-3 rounded-md mt-2 grid grid-cols-7 font-bold text-black-700 text-sm'>
                  <div className='col-span-3'>Titres</div>
                  <div className='col-span-2'>Catégories</div>
                  <div className='col-span-1'>Date d'ajout</div>
              </div>
  
              {/* LISTE DYNAMIQUE DES FORMATIONS */}
              {listeFormations}
  
          </main>
      );
};