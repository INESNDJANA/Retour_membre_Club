import React, { useState } from 'react';
import { ChevronDown, Download, Check } from 'lucide-react';

export default function BooksAndBeingSurvey() {
  const [responses, setResponses] = useState({
    section1: {},
    section2: {},
    section3: {},
    section4: {},
    section5: {},
    section6: {}
  });
  const [submitted, setSubmitted] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const [allResponses, setAllResponses] = useState([]);

  const updateResponse = (section, field, value) => {
    setResponses(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = () => {
    const responseData = {
      timestamp: new Date().toLocaleString('fr-FR'),
      ...responses
    };
    setAllResponses(prev => [...prev, responseData]);
    setResponses({
      section1: {},
      section2: {},
      section3: {},
      section4: {},
      section5: {},
      section6: {}
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(allResponses, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `books-being-responses-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const ScaleQuestion = ({ label, field, section }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>
      <div className="flex gap-2 flex-wrap">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
          <button
            key={num}
            onClick={() => updateResponse(section, field, num)}
            className={`w-10 h-10 rounded border-2 font-semibold transition-all ${
              responses[section][field] === num
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'border-gray-300 text-gray-600 hover:border-indigo-400'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>Pas du tout</span>
        <span>Totalement</span>
      </div>
    </div>
  );

  const OpenQuestion = ({ label, field, section, rows = 3 }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <textarea
        value={responses[section][field] || ''}
        onChange={(e) => updateResponse(section, field, e.target.value)}
        rows={rows}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
        placeholder="Votre réponse..."
      />
    </div>
  );

  const SelectQuestion = ({ label, field, section, options }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <select
        value={responses[section][field] || ''}
        onChange={(e) => updateResponse(section, field, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      >
        <option value="">-- Sélectionnez une option --</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  const RadioQuestion = ({ label, field, section, options }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>
      <div className="space-y-2">
        {options.map(opt => (
          <label key={opt} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name={field}
              value={opt}
              checked={responses[section][field] === opt}
              onChange={(e) => updateResponse(section, field, e.target.value)}
              className="w-4 h-4 text-indigo-600"
            />
            <span className="text-sm text-gray-700">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const CheckboxGroup = ({ label, field, section, options }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>
      <div className="space-y-2">
        {options.map(opt => (
          <label key={opt} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(responses[section][field] || []).includes(opt)}
              onChange={(e) => {
                const current = responses[section][field] || [];
                if (e.target.checked) {
                  updateResponse(section, field, [...current, opt]);
                } else {
                  updateResponse(section, field, current.filter(v => v !== opt));
                }
              }}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <span className="text-sm text-gray-700">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Books & Being</h1>
          <h2 className="text-xl text-indigo-600 font-semibold mb-4">Questionnaire de relance du club de lecture</h2>
          
          <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded">
            <p className="text-sm text-gray-700">
              Ce questionnaire est entièrement <strong>anonyme</strong>. Il a pour objectif de nous permettre de prendre du recul sur l'année écoulée, de comprendre vos expériences et vos ressentis, et de construire ensemble un club dans lequel chacun peut trouver sa place, s'exprimer librement et se sentir valorisé. <strong>Il n'y a pas de bonne ou de mauvaise réponse</strong> : nous souhaitons avant tout avoir des retours sincères.
            </p>
          </div>

          {/* Stats */}
          {allResponses.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-700">
                <strong>{allResponses.length}</strong> réponse{allResponses.length > 1 ? 's' : ''} collectée{allResponses.length > 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {/* Section 1 */}
          {currentSection === 1 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Section 1 — Ton expérience globale</h3>
              
              <OpenQuestion 
                label="1. Depuis combien de temps fais-tu partie du club ?" 
                field="q1_1" 
                section="section1" 
                rows={2}
              />
              
              <ScaleQuestion 
                label="2. Sur une échelle de 1 à 10, comment évalues-tu ton expérience globale cette année ?" 
                field="q1_2" 
                section="section1"
              />
              
              <ScaleQuestion 
                label="3. Sur une échelle de 1 à 10, à quel point t'es-tu senti(e) à l'aise au sein du club ?" 
                field="q1_3" 
                section="section1"
              />
              
              <OpenQuestion 
                label="4. Qu'est-ce que tu as le plus apprécié cette année ?" 
                field="q1_4" 
                section="section1"
              />
              
              <OpenQuestion 
                label="5. Quel est ton meilleur souvenir ou moment marquant dans le club cette année ?" 
                field="q1_5" 
                section="section1"
              />
              
              <OpenQuestion 
                label="6. Y a-t-il quelque chose qui t'a particulièrement donné envie de rester ou de continuer ?" 
                field="q1_6" 
                section="section1"
              />
            </div>
          )}

          {/* Section 2 */}
          {currentSection === 2 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Section 2 — Ce qui a moins bien fonctionné</h3>
              
              <OpenQuestion 
                label="1. Qu'est-ce que tu as le moins apprécié cette année ?" 
                field="q2_1" 
                section="section2"
              />
              
              <OpenQuestion 
                label="2. Y a-t-il des choses qui t'ont frustré(e), déçu(e) ou démotivé(e) ?" 
                field="q2_2" 
                section="section2"
              />
              
              <OpenQuestion 
                label="3. Y a-t-il des aspects du fonctionnement du club qui t'ont semblé inefficaces ou difficiles ?" 
                field="q2_3" 
                section="section2"
              />
              
              <OpenQuestion 
                label="4. Y a-t-il quelque chose que nous aurions pu mieux faire ?" 
                field="q2_4" 
                section="section2"
              />
              
              <OpenQuestion 
                label="5. Si tu pouvais supprimer une seule chose du fonctionnement actuel du club, laquelle serait-ce ? Pourquoi ?" 
                field="q2_5" 
                section="section2"
              />
            </div>
          )}

          {/* Section 3 */}
          {currentSection === 3 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Section 3 — Le rapport aux autres membres</h3>
              
              <RadioQuestion 
                label="1. T'es-tu déjà senti(e) mis(e) à l'écart, ignoré(e) ou insuffisamment considéré(e) au sein du club ?" 
                field="q3_1" 
                section="section3"
                options={['Jamais', 'Rarement', 'Parfois', 'Souvent']}
              />
              
              <RadioQuestion 
                label="2. T'es-tu déjà senti(e) blessé(e), exclu(e), dévalorisé(e) ou mal considéré(e) dans le cadre du club ?" 
                field="q3_2" 
                section="section3"
                options={['Oui', 'Non', 'Je ne sais pas / difficile à déterminer']}
              />
              
              <OpenQuestion 
                label="3. Si tu souhaites nous en parler, explique-nous ce que tu as vécu et ce qui aurait pu être fait différemment. (Question facultative)" 
                field="q3_3" 
                section="section3"
              />
              
              <OpenQuestion 
                label="4. As-tu déjà eu le sentiment que certaines personnes étaient davantage écoutées, valorisées ou considérées que d'autres ?" 
                field="q3_4" 
                section="section3"
              />
              
              <ScaleQuestion 
                label="5. Te sens-tu libre d'exprimer ton opinion, même lorsqu'elle est différente de celle du groupe ?" 
                field="q3_5" 
                section="section3"
              />
              
              <OpenQuestion 
                label="6. Qu'est-ce qui pourrait être fait pour que chacun se sente davantage écouté, apprécié et valorisé à sa juste valeur ?" 
                field="q3_6" 
                section="section3"
              />
              
              <OpenQuestion 
                label="7. Y a-t-il quelque chose que tu aimerais que les autres membres comprennent mieux sur ta manière de participer au club ?" 
                field="q3_7" 
                section="section3"
              />
            </div>
          )}

          {/* Section 4 */}
          {currentSection === 4 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Section 4 — Le fonctionnement du club</h3>
              
              <OpenQuestion 
                label="1. Que penses-tu du rythme des rencontres ?" 
                field="q4_1" 
                section="section4"
              />
              
              <OpenQuestion 
                label="2. Que penses-tu du choix des livres ?" 
                field="q4_2" 
                section="section4"
              />
              
              <OpenQuestion 
                label="3. Que penses-tu de la manière dont les discussions sont organisées ?" 
                field="q4_3" 
                section="section4"
              />
              
              <OpenQuestion 
                label="4. Que penses-tu de la répartition des rôles et des responsabilités ?" 
                field="q4_4" 
                section="section4"
              />
              
              <ScaleQuestion 
                label="5. Estimes-tu que les tâches sont équitablement réparties ?" 
                field="q4_5" 
                section="section4"
              />
              
              <OpenQuestion 
                label="6. Qu'est-ce qui pourrait rendre les séances plus intéressantes ou plus dynamiques ?" 
                field="q4_6" 
                section="section4"
              />
              
              <OpenQuestion 
                label="7. Y a-t-il des rôles ou responsabilités que tu aimerais davantage assumer ?" 
                field="q4_7" 
                section="section4"
              />
              
              <OpenQuestion 
                label="8. Y a-t-il au contraire des responsabilités que tu trouves trop lourdes ou contraignantes ?" 
                field="q4_8" 
                section="section4"
              />
            </div>
          )}

          {/* Section 5 */}
          {currentSection === 5 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Section 5 — Pour la nouvelle année</h3>
              
              <OpenQuestion 
                label="1. Qu'aimerais-tu absolument conserver dans le fonctionnement actuel ?" 
                field="q5_1" 
                section="section5"
              />
              
              <OpenQuestion 
                label="2. Qu'aimerais-tu changer ?" 
                field="q5_2" 
                section="section5"
              />
              
              <OpenQuestion 
                label="3. Qu'aimerais-tu ajouter ?" 
                field="q5_3" 
                section="section5"
              />
              
              <OpenQuestion 
                label="4. Quels types de livres ou de thématiques aimerais-tu explorer ?" 
                field="q5_4" 
                section="section5"
              />
              
              <CheckboxGroup 
                label="5. Préférerais-tu davantage de :"
                field="q5_5" 
                section="section5"
                options={[
                  'Débats',
                  'Présentations',
                  'Échanges libres',
                  'Travaux en petits groupes',
                  'Rencontres avec des auteurs/intervenants',
                  'Activités autour des livres',
                  'Autre'
                ]}
              />
              
              <OpenQuestion 
                label="6. À quoi ressemblerait, selon toi, le club de lecture idéal ?" 
                field="q5_6" 
                section="section5"
              />
              
              <OpenQuestion 
                label="7. Quelle serait, selon toi, la priorité n°1 pour améliorer le club ?" 
                field="q5_7" 
                section="section5"
              />
            </div>
          )}

          {/* Section 6 */}
          {currentSection === 6 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Section 6 — Parole libre</h3>
              
              <OpenQuestion 
                label="1. Si tu pouvais parler librement à l'équipe qui organise le club, sans aucune crainte d'être jugé(e), qu'est-ce que tu aimerais lui dire ?" 
                field="q6_1" 
                section="section6"
                rows={5}
              />
              
              <OpenQuestion 
                label="2. Y a-t-il quelque chose que nous ne t'avons pas demandé et que tu aimerais absolument nous faire savoir ?" 
                field="q6_2" 
                section="section6"
                rows={5}
              />
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentSection(prev => Math.max(1, prev - 1))}
              className="px-4 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50"
              disabled={currentSection === 1}
            >
              ← Section précédente
            </button>
            
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <button
                  key={num}
                  onClick={() => setCurrentSection(num)}
                  className={`w-10 h-10 rounded font-semibold transition-all ${
                    currentSection === num
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            
            {currentSection < 6 ? (
              <button
                onClick={() => setCurrentSection(prev => Math.min(6, prev + 1))}
                className="px-4 py-2 bg-indigo-600 text-white font-medium hover:bg-indigo-700 rounded-lg transition-colors"
              >
                Section suivante →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white font-medium hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <Check size={18} />
                Soumettre
              </button>
            )}
          </div>
        </div>

        {/* Confirmation */}
        {submitted && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 animate-pulse">
            <p className="text-green-800 font-medium">✓ Merci ! Votre réponse a été enregistrée.</p>
          </div>
        )}

        {/* Export */}
        {allResponses.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Résultats collectés</h3>
            <p className="text-gray-700 mb-4">
              <strong>{allResponses.length}</strong> réponse{allResponses.length > 1 ? 's' : ''} collectée{allResponses.length > 1 ? 's' : ''}
            </p>
            <button
              onClick={exportData}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium hover:bg-indigo-700 rounded-lg transition-colors"
            >
              <Download size={18} />
              Exporter les réponses (JSON)
            </button>
            <p className="text-sm text-gray-500 mt-3">
              Les données seront téléchargées dans votre ordinateur pour analyse.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
