import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import api from '../api/client';
import Seo from '../components/Seo';

const initial = {
  nom: '',
  email: '',
  telephone: '',
  sujet: '',
  message: '',
};

function validate(values) {
  const errs = {};
  if (!values.nom.trim()) errs.nom = 'Le nom est obligatoire';
  if (!values.email.trim()) errs.email = "L'email est obligatoire";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errs.email = 'Email invalide';
  if (!values.sujet.trim()) errs.sujet = 'Le sujet est obligatoire';
  if (!values.message.trim()) errs.message = 'Le message est obligatoire';
  return errs;
}

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);
  const [partnerForm, setPartnerForm] = useState(initial);
  const [settings, setSettings] = useState({
    location: 'Nouakchott, Mauritanie',
    email: 'contact@smtsgroup.com',
    phone: '+222 XX XX XX XX'
  });

  useEffect(() => {
    api.get('/settings').then(res => {
      if (res.data) setSettings(s => ({ ...s, ...res.data }));
    }).catch(e => console.error("Could not fetch settings", e));
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const submit = async (e, type = 'contact') => {
    e.preventDefault();
    const values = type === 'partenariat' ? partnerForm : form;
    const v = validate(values);
    setErrors(v);
    if (Object.keys(v).length) return;
    setSending(true);
    setApiError('');
    try {
      await api.post('/contacts', {
        ...values,
        type: type === 'partenariat' ? 'partenariat' : 'contact',
      });
      setSuccess(true);
      if (type === 'partenariat') {
        setPartnerForm(initial);
        setPartnerOpen(false);
      } else {
        setForm(initial);
      }
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setApiError(
        err.response?.data?.message ||
          "L'envoi a échoué. Réessayez dans quelques instants."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Seo
        title="Contact"
        description="Contactez SMTS Group à Nouakchott — investissement en Mauritanie, logistique Nouakchott, facilitation d'affaires et transport international Mauritanie."
        keywords="Investissement en Mauritanie, Logistique Nouakchott, Facilitation d'affaires Mauritanie, Transport international Mauritanie"
      />
      
      <div className="fixed inset-0 pointer-events-none -z-10 bg-smts-dark">
        <div className="absolute inset-0 bg-grid-slate opacity-20" />
        <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-smts-electric/10 blur-3xl rounded-full " />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 md:px-6 lg:px-8 lg:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-smts-electric/10 border border-smts-electric/20 text-smts-electric text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-smts-electric animate-pulse"></span>
            Contact
          </div>
          <h1 className="mt-3 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 md:text-6xl drop-shadow-md">
            Échangeons sur <span className="text-transparent bg-clip-text bg-gradient-to-r from-smts-electric to-smts-accent">votre projet</span>
          </h1>
          <p className="mt-6 text-lg font-medium text-smts-muted">
            Notre équipe répond dans les meilleurs délais pour structurer vos
            opérations en Mauritanie.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: FaMapMarkerAlt,
              title: 'Localisation',
              text: settings.location,
            },
            {
              icon: FaEnvelope,
              title: 'Email',
              text: settings.email,
              href: `mailto:${settings.email}`,
            },
            {
              icon: FaPhone,
              title: 'Téléphone',
              text: settings.phone,
            },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring" }}
              className="glass-card rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-300 group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-smts-electric/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-smts-electric/10 to-smts-accent/10 border border-white/5 text-smts-electric shadow-lg transition-transform group-hover:scale-110 group-hover:bg-smts-electric/20">
                  <c.icon size={26} />
                </div>
                <h2 className="mt-6 text-sm font-bold uppercase tracking-widest text-white/50">
                  {c.title}
                </h2>
                {c.href ? (
                  <a
                    href={c.href}
                    className="mt-2 inline-block text-lg font-extrabold text-white transition-colors hover:text-smts-electric"
                  >
                    {c.text}
                  </a>
                ) : (
                  <p className="mt-2 text-lg font-extrabold text-white">{c.text}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 grid gap-14 lg:grid-cols-2">
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={(e) => submit(e, 'contact')}
            className="glass-card rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-smts-electric/10 blur-3xl rounded-full pointer-events-none" />
            <h2 className="text-3xl font-extrabold text-white relative z-10">
              Formulaire de contact
            </h2>
            <div className="mt-8 grid gap-5 relative z-10">
              {[
                ['nom', 'Nom complet', 'text'],
                ['email', 'Email', 'email'],
                ['telephone', 'Téléphone', 'tel'],
                ['sujet', 'Sujet', 'text'],
              ].map(([name, label, type]) => (
                <div key={name}>
                  <label className="block text-sm font-bold tracking-wide text-white/70 uppercase">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={onChange}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#030712]/50 px-5 py-3.5 text-white placeholder-white/30 outline-none backdrop-blur-sm transition-all focus:border-smts-electric/50 focus:bg-[#030712]/80 focus:ring-2 focus:ring-smts-electric/30 focus:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                  />
                  {errors[name] && (
                    <p className="mt-2 text-[13px] font-medium text-red-400 tracking-wide">{errors[name]}</p>
                  )}
                </div>
              ))}
              <div>
                <label className="block text-sm font-bold tracking-wide text-white/70 uppercase">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={5}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#030712]/50 px-5 py-3.5 text-white placeholder-white/30 outline-none backdrop-blur-sm transition-all focus:border-smts-electric/50 focus:bg-[#030712]/80 focus:ring-2 focus:ring-smts-electric/30 focus:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                />
                {errors.message && (
                  <p className="mt-2 text-[13px] font-medium text-red-400 tracking-wide">{errors.message}</p>
                )}
              </div>
            </div>
            {apiError && (
              <p className="mt-6 text-[15px] font-medium text-red-400 relative z-10">{apiError}</p>
            )}
            <button
              type="submit"
              disabled={sending}
              className="mt-8 btn-premium w-full px-8 py-4 text-sm z-10 group disabled:opacity-60"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-smts-electric to-smts-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative z-10">{sending ? 'Envoi en cours...' : 'Envoyer le message'}</span>
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-fit relative overflow-hidden"
          >
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-smts-accent/10 blur-3xl rounded-full pointer-events-none" />
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 relative z-10">
              Vous êtes investisseur ou entreprise ?
            </h2>
            <p className="mt-6 text-[17px] font-medium leading-relaxed text-smts-muted relative z-10">
              Contactez-nous pour explorer les opportunités en Mauritanie.
              Décrivez votre secteur d&apos;intérêt et vos objectifs : nous
              vous proposons un échange personnalisé.
            </p>
            <button
              type="button"
              onClick={() => setPartnerOpen((v) => !v)}
              className="mt-8 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-smts-electric hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:-translate-y-1 relative z-10"
            >
              {partnerOpen
                ? 'Fermer le formulaire de partenariat'
                : 'Demande de partenariat'}
            </button>
            <AnimatePresence>
              {partnerOpen && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={(e) => submit(e, 'partenariat')}
                  className="mt-10 space-y-6 overflow-hidden border-t border-white/10 pt-10 relative z-10"
                >
                  {['nom', 'email', 'telephone', 'sujet'].map((name) => (
                    <div key={name}>
                      <label className="block text-sm font-bold tracking-wide text-white/70 uppercase">
                        {name === 'sujet' ? 'Sujet du projet' : name}
                      </label>
                      <input
                        name={name}
                        value={partnerForm[name]}
                        onChange={(e) => {
                          setPartnerForm((f) => ({
                            ...f,
                            [name]: e.target.value,
                          }));
                          setErrors((er) => ({ ...er, [name]: undefined }));
                        }}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#030712]/50 px-5 py-3.5 text-white placeholder-white/30 outline-none backdrop-blur-sm transition-all focus:border-smts-electric/50 focus:bg-[#030712]/80 focus:ring-2 focus:ring-smts-electric/30"
                      />
                      {errors[name] && (
                        <p className="mt-2 text-[13px] font-medium text-red-400 tracking-wide">{errors[name]}</p>
                      )}
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-bold tracking-wide text-white/70 uppercase">
                      Détails de l'investissement
                    </label>
                    <textarea
                      name="message"
                      value={partnerForm.message}
                      onChange={(e) => {
                        setPartnerForm((f) => ({
                          ...f,
                          message: e.target.value,
                        }));
                        setErrors((er) => ({ ...er, message: undefined }));
                      }}
                      rows={4}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#030712]/50 px-5 py-3.5 text-white placeholder-white/30 outline-none backdrop-blur-sm transition-all focus:border-smts-electric/50 focus:bg-[#030712]/80 focus:ring-2 focus:ring-smts-electric/30"
                    />
                    {errors.message && (
                      <p className="mt-2 text-[13px] font-medium text-red-400 tracking-wide">{errors.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-4 w-full rounded-full bg-white px-8 py-4 text-sm font-bold text-[#030712] shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:bg-gray-200 transition-all disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {sending ? 'Transmission...' : 'Envoyer la demande'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-10 left-1/2 z-[100] w-[90%] max-w-sm -translate-x-1/2 rounded-2xl border border-emerald-500/50 bg-[#030712]/95 px-6 py-5 text-center text-[15px] font-medium text-emerald-100 shadow-[0_0_30px_rgba(16,185,129,0.3)] backdrop-blur-sm"
            >
              Message envoyé avec succès. Notre équipe vous recontacte très
              prochainement.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
