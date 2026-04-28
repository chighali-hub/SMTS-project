import { useState } from 'react';
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
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-smts-electric">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-white md:text-5xl">
            Échangeons sur votre projet
          </h1>
          <p className="mt-4 text-white/70">
            Notre équipe répond dans les meilleurs délais pour structurer vos
            opérations en Mauritanie.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: FaMapMarkerAlt,
              title: 'Localisation',
              text: 'Nouakchott, Mauritanie',
            },
            {
              icon: FaEnvelope,
              title: 'Email',
              text: 'contact@smtsgroup.com',
              href: 'mailto:contact@smtsgroup.com',
            },
            {
              icon: FaPhone,
              title: 'Téléphone',
              text: '+222 XX XX XX XX',
            },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-6"
            >
              <c.icon className="text-2xl text-smts-electric" />
              <h2 className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/50">
                {c.title}
              </h2>
              {c.href ? (
                <a
                  href={c.href}
                  className="mt-2 inline-block font-medium text-white hover:text-smts-electric"
                >
                  {c.text}
                </a>
              ) : (
                <p className="mt-2 font-medium text-white">{c.text}</p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid gap-14 lg:grid-cols-2">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={(e) => submit(e, 'contact')}
            className="glass rounded-2xl p-8"
          >
            <h2 className="text-xl font-bold text-white">Formulaire de contact</h2>
            <div className="mt-6 grid gap-4">
              {[
                ['nom', 'Nom complet'],
                ['email', 'Email'],
                ['telephone', 'Téléphone'],
                ['sujet', 'Sujet'],
              ].map(([name, label]) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-white/70">
                    {label}
                  </label>
                  <input
                    name={name}
                    value={form[name]}
                    onChange={onChange}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none ring-smts-electric/50 focus:ring-2"
                  />
                  {errors[name] && (
                    <p className="mt-1 text-xs text-red-300">{errors[name]}</p>
                  )}
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-white/70">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={5}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none ring-smts-electric/50 focus:ring-2"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-300">{errors.message}</p>
                )}
              </div>
            </div>
            {apiError && (
              <p className="mt-4 text-sm text-red-300">{apiError}</p>
            )}
            <button
              type="submit"
              disabled={sending}
              className="mt-6 w-full rounded-full bg-smts-electric py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:opacity-60"
            >
              {sending ? 'Envoi...' : 'Envoyer le message'}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <h2 className="text-xl font-bold text-white">
              Vous êtes investisseur ou entreprise ?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Contactez-nous pour explorer les opportunités en Mauritanie.
              Décrivez votre secteur d&apos;intérêt et vos objectifs : nous
              vous proposons un échange personnalisé.
            </p>
            <button
              type="button"
              onClick={() => setPartnerOpen((v) => !v)}
              className="mt-6 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-smts-electric hover:text-smts-electric"
            >
              {partnerOpen
                ? 'Fermer le formulaire partenariat'
                : 'Demande de partenariat'}
            </button>
            <AnimatePresence>
              {partnerOpen && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={(e) => submit(e, 'partenariat')}
                  className="mt-8 space-y-4 overflow-hidden border-t border-white/10 pt-8"
                >
                  {['nom', 'email', 'telephone', 'sujet'].map((name) => (
                    <div key={name}>
                      <label className="block text-sm capitalize text-white/70">
                        {name === 'sujet' ? 'Sujet' : name}
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
                        className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white outline-none focus:ring-2 focus:ring-smts-electric/50"
                      />
                      {errors[name] && (
                        <p className="mt-1 text-xs text-red-300">{errors[name]}</p>
                      )}
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm text-white/70">Message</label>
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
                      className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white outline-none focus:ring-2 focus:ring-smts-electric/50"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-300">{errors.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full rounded-full bg-white py-3 text-sm font-semibold text-smts-navy hover:bg-smts-light disabled:opacity-60"
                  >
                    {sending ? 'Envoi...' : 'Envoyer la demande'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-8 left-1/2 z-[100] w-[90%] max-w-md -translate-x-1/2 rounded-2xl border border-emerald-500/30 bg-emerald-950/95 px-6 py-4 text-center text-sm text-emerald-100 shadow-2xl backdrop-blur-md"
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
