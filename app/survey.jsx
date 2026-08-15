import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, Check, BookOpen } from 'lucide-react';

// Clé d'accès admin — visible seulement à toi. Change-la si tu veux.
const ADMIN_KEY = 'ines2026';

const SectionTitle = ({ n, title }) => (
  <div className="flex items-center gap-4 mb-8 pb-4 border-b border-terracotta-100">
    <span className="flex-none w-11 h-11 rounded-2xl bg-gradient-to-br from-terracotta-500 to-terracotta-700 text-white font-bold flex items-center justify-center text-lg font-serif shadow-sm">
      {n}
    </span>
    <div>
      <span className="block text-xs font-bold tracking-widest uppercase text-terracotta-500">Section {n} / 6</span>
      <h3 className="text-2xl font-bold text-gray-900 font-serif leading-tight">{title}</h3>
    </div>
  </div>
);

const ScaleQuestion = ({ label, value, onChange, error }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>
    <div className="flex gap-2 flex-wrap">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
        <button
          key={num}
          type="button"
          onClick={() => onChange(num)}
          className={`w-10 h-10 rounded-full font-semibold transition-all duration-150 ${
            value === num
              ? 'bg-gradient-to-br from-terracotta-500 to-terracotta-700 text-white shadow-md scale-110'
              : error
                ? 'bg-white border-2 border-red-300 text-gray-500 hover:border-terracotta-400 hover:text-terracotta-600'
                : 'bg-white border-2 border-gray-200 text-gray-500 hover:border-terracotta-400 hover:text-terracotta-600'
          }`}
        >
          {num}
        </button>
      ))}
    </div>
    <div className="flex justify-between text-xs text-gray-400 mt-2 uppercase tracking-wide">
      <span>Pas du tout</span>
      <span>Totalement</span>
    </div>
    {error && <p className="text-xs text-red-500 mt-1.5">Ce champ est requis.</p>}
  </div>
);

const OpenQuestion = ({ label, value, onChange, rows = 3, error }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:ring-2 focus:border-transparent focus:bg-white transition-colors resize-none ${
        error ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-terracotta-400'
      }`}
      placeholder="Votre réponse..."
    />
    {error && <p className="text-xs text-red-500 mt-1.5">Ce champ est requis.</p>}
  </div>
);

const SelectQuestion = ({ label, value, onChange, options, error }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:ring-2 focus:border-transparent ${
        error ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-terracotta-400'
      }`}
    >
      <option value="">-- Sélectionnez une option --</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {error && <p className="text-xs text-red-500 mt-1.5">Ce champ est requis.</p>}
  </div>
);

const RadioQuestion = ({ label, value, onChange, options, error }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>
    <div className="space-y-2">
      {options.map(opt => {
        const selected = value === opt;
        return (
          <button
            type="button"
            key={opt}
            onClick={() => onChange(opt)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-left transition-all ${
              selected
                ? 'border-terracotta-500 bg-terracotta-50'
                : error
                  ? 'border-red-200 bg-white hover:border-terracotta-200'
                  : 'border-gray-200 bg-white hover:border-terracotta-200'
            }`}
          >
            <span className={`flex-none w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selected ? 'border-terracotta-600' : 'border-gray-300'
            }`}>
              {selected && <span className="w-2.5 h-2.5 rounded-full bg-terracotta-600"></span>}
            </span>
            <span className={`text-sm ${selected ? 'text-terracotta-800 font-medium' : 'text-gray-700'}`}>{opt}</span>
          </button>
        );
      })}
    </div>
    {error && <p className="text-xs text-red-500 mt-1.5">Ce champ est requis.</p>}
  </div>
);

const CheckboxGroup = ({ label, value, onChange, options, error }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>
    <div className="space-y-2">
      {options.map(opt => {
        const current = value || [];
        const selected = current.includes(opt);
        return (
          <button
            type="button"
            key={opt}
            onClick={() => {
              if (selected) {
                onChange(current.filter(v => v !== opt));
              } else {
                onChange([...current, opt]);
              }
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-left transition-all ${
              selected
                ? 'border-terracotta-500 bg-terracotta-50'
                : error
                  ? 'border-red-200 bg-white hover:border-terracotta-200'
                  : 'border-gray-200 bg-white hover:border-terracotta-200'
            }`}
          >
            <span className={`flex-none w-5 h-5 rounded-md border-2 flex items-center justify-center ${
              selected ? 'border-terracotta-600 bg-terracotta-600' : 'border-gray-300'
            }`}>
              {selected && <Check size={13} className="text-white" strokeWidth={3} />}
            </span>
            <span className={`text-sm ${selected ? 'text-terracotta-800 font-medium' : 'text-gray-700'}`}>{opt}</span>
          </button>
        );
      })}
    </div>
    {error && <p className="text-xs text-red-500 mt-1.5">Ce champ est requis.</p>}
  </div>
);

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
  const [isAdmin, setIsAdmin] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === ADMIN_KEY) {
      setIsAdmin(true);
    }
  }, []);

  // Questions clés obligatoires par section (la Section 6 "Parole libre" reste facultative)
  const REQUIRED_FIELDS = {
    section1: ['q1_2', 'q1_3', 'q1_5'],
    section2: ['q2_1', 'q2_4'],
    section3: ['q3_1', 'q3_5', 'q3_6'],
    section4: ['q4_1', 'q4_2', 'q4_5'],
    section5: ['q5_2', 'q5_5', 'q5_7'],
    section6: []
  };

  const isEmpty = (v) => {
    if (v === undefined || v === null) return true;
    if (typeof v === 'string') return v.trim() === '';
    if (Array.isArray(v)) return v.length === 0;
    return false;
  };

  const sectionKey = (n) => `section${n}`;

  const validateSection = (n) => {
    const key = sectionKey(n);
    const fields = REQUIRED_FIELDS[key] || [];
    const newErrors = {};
    fields.forEach(f => {
      if (isEmpty(responses[key][f])) newErrors[f] = true;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    if (validateSection(currentSection)) {
      setCurrentSection(prev => Math.min(6, prev + 1));
    }
  };

  const updateResponse = (section, field, value) => {
    setResponses(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setErrors(prev => (prev[field] ? { ...prev, [field]: false } : prev));
  };

  const handleSubmit = () => {
    if (!validateSection(currentSection)) return;
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


  return (
    <div className="relative min-h-screen bg-gradient-to-br from-terracotta-50 via-[#FAF6F0] to-terracotta-100 py-12 px-4 overflow-hidden">
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-terracotta-200 opacity-30 blur-3xl animate-floatA"></div>
      <div className="pointer-events-none absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-terracotta-300 opacity-20 blur-3xl animate-floatB"></div>
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-terracotta-100 opacity-40 blur-3xl animate-floatC"></div>

      <div className="relative max-w-2xl mx-auto">
        {/* Header / Hero */}
        <div className="rounded-3xl shadow-xl overflow-hidden mb-8 bg-white">
          <div className="bg-gradient-to-br from-terracotta-600 to-terracotta-700 px-8 pt-10 pb-14 text-center relative">
            <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center border border-white/30">
              <BookOpen className="text-white" size={30} strokeWidth={1.75} />
            </div>
            <span className="block text-xs font-bold tracking-[0.2em] uppercase text-white/80 mb-1">Books &amp; Being</span>
            <h1 className="text-2xl md:text-3xl font-bold text-white font-serif">Questionnaire de relance</h1>
          </div>

          <div className="px-8 -mt-6 pb-8">
            <div className="bg-terracotta-50 border border-terracotta-100 rounded-2xl shadow-sm p-5">
              <p className="text-sm text-gray-700 leading-relaxed">
                Ce questionnaire est entièrement <strong className="text-terracotta-700">anonyme</strong>. Il a pour objectif de nous permettre de prendre du recul sur l'année écoulée, de comprendre vos expériences et vos ressentis, et de construire ensemble un club dans lequel chacun peut trouver sa place, s'exprimer librement et se sentir valorisé. <strong className="text-terracotta-700">Il n'y a pas de bonne ou de mauvaise réponse</strong> : nous souhaitons avant tout avoir des retours sincères.
              </p>
            </div>

            {/* Stats — visible uniquement en mode admin */}
            {isAdmin && allResponses.length > 0 && (
              <div className="mt-4 px-4 py-2.5 bg-gray-50 rounded-xl inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-terracotta-500"></span>
                <p className="text-sm text-gray-600">
                  <strong className="text-gray-900">{allResponses.length}</strong> réponse{allResponses.length > 1 ? 's' : ''} collectée{allResponses.length > 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-3 px-1">
          <div className="w-full h-1.5 bg-terracotta-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-terracotta-500 to-terracotta-700 rounded-full transition-all duration-300"
              style={{ width: `${(currentSection / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 mb-8">
          {/* Section 1 */}
          {currentSection === 1 && (
            <div className="animate-fadeIn">
              <SectionTitle n={1} title="Ton expérience globale" />
              
              <ScaleQuestion 
                label="1. Sur une échelle de 1 à 10, comment évalues-tu ton expérience globale cette année ? *" 
                value={responses.section1.q1_2}
                onChange={(v) => updateResponse('section1', 'q1_2', v)}
              error={errors.q1_2}
              />
              
              <ScaleQuestion 
                label="2. Sur une échelle de 1 à 10, à quel point t'es-tu senti(e) à l'aise au sein du club ? *" 
                value={responses.section1.q1_3}
                onChange={(v) => updateResponse('section1', 'q1_3', v)}
              error={errors.q1_3}
              />
              
              <OpenQuestion 
                label="3. Quel est ton meilleur souvenir ou moment marquant dans le club cette année ? *" 
                value={responses.section1.q1_5}
                onChange={(v) => updateResponse('section1', 'q1_5', v)}
              error={errors.q1_5}
              />
            </div>
          )}

          {/* Section 2 */}
          {currentSection === 2 && (
            <div className="animate-fadeIn">
              <SectionTitle n={2} title="Ce qui a moins bien fonctionné" />
              
              <OpenQuestion 
                label="1. Qu'est-ce que tu as le moins apprécié cette année ? *" 
                value={responses.section2.q2_1}
                onChange={(v) => updateResponse('section2', 'q2_1', v)}
              error={errors.q2_1}
              />
              
              <OpenQuestion 
                label="2. Y a-t-il quelque chose que nous aurions pu mieux faire ? *" 
                value={responses.section2.q2_4}
                onChange={(v) => updateResponse('section2', 'q2_4', v)}
              error={errors.q2_4}
              />
            </div>
          )}

          {/* Section 3 */}
          {currentSection === 3 && (
            <div className="animate-fadeIn">
              <SectionTitle n={3} title="Le rapport aux autres membres" />
              
              <RadioQuestion 
                label="1. T'es-tu déjà senti(e) mis(e) à l'écart, ignoré(e) ou insuffisamment considéré(e) au sein du club ? *" 
                value={responses.section3.q3_1}
                onChange={(v) => updateResponse('section3', 'q3_1', v)}
                options={['Jamais', 'Rarement', 'Parfois', 'Souvent']}
              error={errors.q3_1}
              />
              
              <ScaleQuestion 
                label="2. Te sens-tu libre d'exprimer ton opinion, même lorsqu'elle est différente de celle du groupe ? *" 
                value={responses.section3.q3_5}
                onChange={(v) => updateResponse('section3', 'q3_5', v)}
              error={errors.q3_5}
              />
              
              <OpenQuestion 
                label="3. Qu'est-ce qui pourrait être fait pour que chacun se sente davantage écouté, apprécié et valorisé à sa juste valeur ? *" 
                value={responses.section3.q3_6}
                onChange={(v) => updateResponse('section3', 'q3_6', v)}
              error={errors.q3_6}
              />
            </div>
          )}

          {/* Section 4 */}
          {currentSection === 4 && (
            <div className="animate-fadeIn">
              <SectionTitle n={4} title="Le fonctionnement du club" />
              
              <OpenQuestion 
                label="1. Que penses-tu du rythme des rencontres ? *" 
                value={responses.section4.q4_1}
                onChange={(v) => updateResponse('section4', 'q4_1', v)}
              error={errors.q4_1}
              />
              
              <OpenQuestion 
                label="2. Que penses-tu du choix des livres ? *" 
                value={responses.section4.q4_2}
                onChange={(v) => updateResponse('section4', 'q4_2', v)}
              error={errors.q4_2}
              />
              
              <ScaleQuestion 
                label="3. Estimes-tu que les tâches sont équitablement réparties ? *" 
                value={responses.section4.q4_5}
                onChange={(v) => updateResponse('section4', 'q4_5', v)}
              error={errors.q4_5}
              />
            </div>
          )}

          {/* Section 5 */}
          {currentSection === 5 && (
            <div className="animate-fadeIn">
              <SectionTitle n={5} title="Pour la nouvelle année" />
              
              <OpenQuestion 
                label="1. Qu'aimerais-tu changer ? *" 
                value={responses.section5.q5_2}
                onChange={(v) => updateResponse('section5', 'q5_2', v)}
              error={errors.q5_2}
              />
              
              <CheckboxGroup 
                label="2. Préférerais-tu davantage de : *"
                value={responses.section5.q5_5}
                onChange={(v) => updateResponse('section5', 'q5_5', v)}
                options={[
                  'Débats',
                  'Présentations',
                  'Échanges libres',
                  'Travaux en petits groupes',
                  'Rencontres avec des auteurs/intervenants',
                  'Activités autour des livres',
                  'Autre'
                ]}
                error={errors.q5_5}
              />
              
              <OpenQuestion 
                label="3. Quelle serait, selon toi, la priorité n°1 pour améliorer le club ? *" 
                value={responses.section5.q5_7}
                onChange={(v) => updateResponse('section5', 'q5_7', v)}
              error={errors.q5_7}
              />
            </div>
          )}

          {/* Section 6 */}
          {currentSection === 6 && (
            <div className="animate-fadeIn">
              <SectionTitle n={6} title="Parole libre" />
              
              <OpenQuestion 
                label="Si tu pouvais parler librement à l'équipe qui organise le club, sans aucune crainte d'être jugé(e), qu'est-ce que tu aimerais lui dire ?" 
                value={responses.section6.q6_1}
                onChange={(v) => updateResponse('section6', 'q6_1', v)}
                rows={5}
              />
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => setCurrentSection(prev => Math.max(1, prev - 1))}
              className="flex items-center gap-1 px-4 py-2.5 text-terracotta-600 font-medium hover:bg-terracotta-50 rounded-full transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
              disabled={currentSection === 1}
            >
              <ChevronLeft size={18} />
              <span className="hidden sm:inline">Précédent</span>
            </button>
            
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <button
                  key={num}
                  onClick={() => setCurrentSection(num)}
                  className={`h-2.5 rounded-full transition-all duration-200 ${
                    currentSection === num
                      ? 'w-7 bg-terracotta-600'
                      : 'w-2.5 bg-gray-200 hover:bg-terracotta-200'
                  }`}
                  aria-label={`Section ${num}`}
                />
              ))}
            </div>
            
            {currentSection < 6 ? (
              <button
                onClick={goNext}
                className="flex items-center gap-1 px-5 py-2.5 bg-gradient-to-br from-terracotta-600 to-terracotta-700 text-white font-medium hover:shadow-lg rounded-full transition-all"
              >
                <span className="hidden sm:inline">Suivant</span>
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white font-medium hover:shadow-lg rounded-full transition-all flex items-center gap-2"
              >
                <Check size={18} />
                Soumettre
              </button>
            )}
          </div>
        </div>

        {/* Confirmation */}
        {submitted && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-8 animate-pulse flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-none">
              <Check size={16} className="text-white" />
            </span>
            <p className="text-emerald-800 font-medium">Merci ! Votre réponse a été enregistrée.</p>
          </div>
        )}

        {/* Export — visible uniquement en mode admin */}
        {isAdmin && allResponses.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-1 font-serif">Résultats collectés</h3>
            <p className="text-gray-500 mb-4 text-sm">
              <strong className="text-gray-900">{allResponses.length}</strong> réponse{allResponses.length > 1 ? 's' : ''} collectée{allResponses.length > 1 ? 's' : ''}
            </p>
            <button
              onClick={exportData}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-terracotta-600 to-terracotta-700 text-white font-medium hover:shadow-lg rounded-full transition-all"
            >
              <Download size={18} />
              Exporter les réponses (JSON)
            </button>
            <p className="text-xs text-gray-400 mt-3">
              Les données seront téléchargées dans votre ordinateur pour analyse.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
