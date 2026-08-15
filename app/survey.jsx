'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, Check, BookOpen, RefreshCw } from 'lucide-react';

// Clé d'accès admin — garde-la pour toi, change-la si tu veux.
const ADMIN_KEY = 'ines2026';
const TOTAL_SECTIONS = 4;

const SectionTitle = ({ n, title }) => (
  <div className="flex items-center gap-4 mb-8 pb-4 border-b border-terracotta-100">
    <span className="flex-none w-11 h-11 rounded-2xl bg-gradient-to-br from-terracotta-500 to-terracotta-700 text-white font-bold flex items-center justify-center text-lg font-serif shadow-sm">
      {n}
    </span>
    <div>
      <span className="block text-xs font-bold tracking-widest uppercase text-terracotta-500">Section {n} / {TOTAL_SECTIONS}</span>
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

// Fond animé en vagues — sobre (une seule famille de couleurs) mais bien visible
const WaveBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-terracotta-50 via-[#FBF6F0] to-terracotta-100">
    <svg className="absolute bottom-0 left-0 w-[200%] h-40 md:h-56 animate-waveA" viewBox="0 0 2880 200" preserveAspectRatio="none">
      <path d="M0,100 C240,180 480,20 720,100 C960,180 1200,20 1440,100 C1680,180 1920,20 2160,100 C2400,180 2640,20 2880,100 L2880,200 L0,200 Z" fill="#D98A63" fillOpacity="0.35" />
    </svg>
    <svg className="absolute bottom-0 left-0 w-[200%] h-32 md:h-44 animate-waveB" viewBox="0 0 2880 200" preserveAspectRatio="none">
      <path d="M0,120 C240,40 480,200 720,120 C960,40 1200,200 1440,120 C1680,40 1920,200 2160,120 C2400,40 2640,200 2880,120 L2880,200 L0,200 Z" fill="#BE5B32" fillOpacity="0.22" />
    </svg>
    <svg className="absolute bottom-0 left-0 w-[200%] h-24 md:h-32 animate-waveC" viewBox="0 0 2880 200" preserveAspectRatio="none">
      <path d="M0,140 C240,100 480,180 720,140 C960,100 1200,180 1440,140 C1680,100 1920,180 2160,140 C2400,100 2640,180 2880,140 L2880,200 L0,200 Z" fill="#8F4526" fillOpacity="0.16" />
    </svg>
  </div>
);

export default function BooksAndBeingSurvey() {
  const [responses, setResponses] = useState({
    section1: {},
    section2: {},
    section3: {},
    section4: {}
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const [errors, setErrors] = useState({});

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminResponses, setAdminResponses] = useState([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === ADMIN_KEY) {
      setIsAdmin(true);
    }
  }, []);

  const fetchAdminResponses = async () => {
    setAdminLoading(true);
    setAdminError(false);
    try {
      const res = await fetch(`/api/responses?admin=${ADMIN_KEY}`);
      if (!res.ok) throw new Error('unauthorized or not configured');
      const data = await res.json();
      setAdminResponses(data);
    } catch (e) {
      setAdminError(true);
    } finally {
      setAdminLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) fetchAdminResponses();
  }, [isAdmin]);

  // Questions clés obligatoires par section — les questions de contexte, d'implication
  // et de format restent facultatives pour ne pas alourdir le formulaire.
  const REQUIRED_FIELDS = {
    section1: ['q1_1', 'q1_2'],
    section2: ['q2_1', 'q2_2'],
    section3: ['q3_1', 'q3_3'],
    section4: []
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
      setCurrentSection(prev => Math.min(TOTAL_SECTIONS, prev + 1));
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

  const handleSubmit = async () => {
    if (!validateSection(currentSection)) return;
    setSubmitting(true);
    setSubmitError(false);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(responses)
      });
      if (!res.ok) throw new Error('submit failed');
      setResponses({ section1: {}, section2: {}, section3: {}, section4: {} });
      setCurrentSection(1);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (e) {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(adminResponses, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `books-being-responses-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  return (
    <>
      <WaveBackground />
      <div className="relative min-h-screen py-12 px-4">
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
                  Ce questionnaire est entièrement <strong className="text-terracotta-700">anonyme</strong>. Il a pour objectif de nous permettre de prendre du recul sur l'année écoulée et de construire ensemble un club où chacun trouve sa place. <strong className="text-terracotta-700">Il n'y a pas de bonne ou de mauvaise réponse</strong>.
                </p>
              </div>
            </div>
          </div>

          {!isAdmin && (
            <>
              {/* Progress bar */}
              <div className="mb-3 px-1">
                <div className="w-full h-1.5 bg-terracotta-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-terracotta-500 to-terracotta-700 rounded-full transition-all duration-300"
                    style={{ width: `${(currentSection / TOTAL_SECTIONS) * 100}%` }}
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
                      value={responses.section1.q1_1}
                      onChange={(v) => updateResponse('section1', 'q1_1', v)}
                      error={errors.q1_1}
                    />

                    <OpenQuestion
                      label="2. Qu'est-ce qui t'a le plus marqué ou le plus plu cette année ? *"
                      value={responses.section1.q1_2}
                      onChange={(v) => updateResponse('section1', 'q1_2', v)}
                      error={errors.q1_2}
                    />
                  </div>
                )}

                {/* Section 2 */}
                {currentSection === 2 && (
                  <div className="animate-fadeIn">
                    <SectionTitle n={2} title="Le rapport aux autres membres" />

                    <RadioQuestion
                      label="1. T'es-tu déjà senti(e) mis(e) à l'écart, ignoré(e) ou insuffisamment considéré(e) au sein du club ? *"
                      value={responses.section2.q2_1}
                      onChange={(v) => updateResponse('section2', 'q2_1', v)}
                      options={['Jamais', 'Rarement', 'Parfois', 'Souvent']}
                      error={errors.q2_1}
                    />

                    <ScaleQuestion
                      label="2. Te sens-tu libre d'exprimer ton opinion, même lorsqu'elle est différente de celle du groupe ? *"
                      value={responses.section2.q2_2}
                      onChange={(v) => updateResponse('section2', 'q2_2', v)}
                      error={errors.q2_2}
                    />

                    <OpenQuestion
                      label="3. Si tu t'es déjà senti(e) mis(e) à l'écart ou blessé(e), peux-tu nous dire dans quel contexte ? Ça nous aide à comprendre et à corriger. (facultatif)"
                      value={responses.section2.q2_3}
                      onChange={(v) => updateResponse('section2', 'q2_3', v)}
                    />
                  </div>
                )}

                {/* Section 3 */}
                {currentSection === 3 && (
                  <div className="animate-fadeIn">
                    <SectionTitle n={3} title="Fonctionnement du club" />

                    <OpenQuestion
                      label="1. Qu'est-ce qui pourrait être amélioré pour que chacun se sente davantage écouté et valorisé ? *"
                      value={responses.section3.q3_1}
                      onChange={(v) => updateResponse('section3', 'q3_1', v)}
                      error={errors.q3_1}
                    />

                    <OpenQuestion
                      label="2. Au-delà de participer aux lectures et aux débats, aimerais-tu être davantage impliqué(e) dans l'organisation du club ? Si oui, qu'est-ce que tu aimerais apporter ? (facultatif)"
                      value={responses.section3.q3_2}
                      onChange={(v) => updateResponse('section3', 'q3_2', v)}
                    />

                    <OpenQuestion
                      label="3. Que penses-tu de la manière dont nos débats du jeudi sont structurés et modérés ? Qu'est-ce qui pourrait être amélioré ? *"
                      value={responses.section3.q3_3}
                      onChange={(v) => updateResponse('section3', 'q3_3', v)}
                      error={errors.q3_3}
                    />

                    <CheckboxGroup
                      label="4. Y a-t-il d'autres formats que tu aimerais tester pendant les séances du jeudi ? (facultatif)"
                      value={responses.section3.q3_4}
                      onChange={(v) => updateResponse('section3', 'q3_4', v)}
                      options={[
                        'Présentations',
                        'Échanges libres',
                        'Rencontres avec des auteurs/intervenants',
                        'Autre'
                      ]}
                    />

                    {(responses.section3.q3_4 || []).includes('Autre') && (
                      <OpenQuestion
                        label="Précise ce format :"
                        value={responses.section3.q3_5}
                        onChange={(v) => updateResponse('section3', 'q3_5', v)}
                        rows={2}
                      />
                    )}
                  </div>
                )}

                {/* Section 4 */}
                {currentSection === 4 && (
                  <div className="animate-fadeIn">
                    <SectionTitle n={4} title="Parole libre" />

                    <OpenQuestion
                      label="Si tu pouvais parler librement à l'équipe qui organise le club, sans aucune crainte d'être jugé(e), qu'est-ce que tu aimerais lui dire ? (facultatif)"
                      value={responses.section4.q4_1}
                      onChange={(v) => updateResponse('section4', 'q4_1', v)}
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
                    {Array.from({ length: TOTAL_SECTIONS }, (_, i) => i + 1).map(num => (
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

                  {currentSection < TOTAL_SECTIONS ? (
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
                      disabled={submitting}
                      className="px-6 py-2.5 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white font-medium hover:shadow-lg rounded-full transition-all flex items-center gap-2 disabled:opacity-60"
                    >
                      <Check size={18} />
                      {submitting ? 'Envoi...' : 'Soumettre'}
                    </button>
                  )}
                </div>
              </div>

              {/* Confirmation / error */}
              {submitted && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-none">
                    <Check size={16} className="text-white" />
                  </span>
                  <p className="text-emerald-800 font-medium">Merci ! Ta réponse a été enregistrée.</p>
                </div>
              )}
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-8">
                  <p className="text-red-700 text-sm">L'envoi a échoué. Vérifie ta connexion et réessaie.</p>
                </div>
              )}
            </>
          )}

          {/* Admin panel */}
          {isAdmin && (
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-gray-900 font-serif">Espace admin — Réponses collectées</h3>
                <button
                  onClick={fetchAdminResponses}
                  className="flex items-center gap-1.5 text-sm text-terracotta-600 hover:text-terracotta-700 font-medium"
                >
                  <RefreshCw size={14} className={adminLoading ? 'animate-spin' : ''} />
                  Rafraîchir
                </button>
              </div>

              {adminLoading && <p className="text-gray-400 text-sm mt-4">Chargement...</p>}

              {adminError && (
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
                  Impossible de récupérer les réponses. Si c'est la première utilisation, il faut connecter une base de données Vercel KV au projet (voir les instructions fournies).
                </div>
              )}

              {!adminLoading && !adminError && (
                <>
                  <p className="text-gray-500 mb-4 text-sm">
                    <strong className="text-gray-900">{adminResponses.length}</strong> réponse{adminResponses.length > 1 ? 's' : ''} collectée{adminResponses.length > 1 ? 's' : ''}
                  </p>
                  <button
                    onClick={exportData}
                    disabled={adminResponses.length === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-terracotta-600 to-terracotta-700 text-white font-medium hover:shadow-lg rounded-full transition-all disabled:opacity-40"
                  >
                    <Download size={18} />
                    Exporter les réponses (JSON)
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
