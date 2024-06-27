import { labelsToOptions } from '@app/ui/components/Form/utils/options'

export const typologieStructureLabels = {
  ACI: 'Structures porteuses d’ateliers et chantiers d’insertion (ACI)',
  ACIPHC: 'SIAE — Atelier chantier d’insertion premières heures en chantier',
  AFPA: 'Agence nationale pour la formation professionnelle des adultes (AFPA)',
  AI: 'Associations intermédiaires (AI)',
  ASE: 'Aide sociale à l’enfance (ASE)',
  ASSO: 'Associations',
  ASSO_CHOMEUR: 'Associations de chômeurs',
  Autre: 'Autre',
  AVIP: "Crèche à vocation d'insertion professionnelle",
  BIB: 'Bibliothèque / Médiathèque',
  CAARUD:
    "CAARUD - Centre d'accueil et d'accompagnement à la réduction de risques pour usagers de drogues",
  CADA: 'Centres d’accueil de demandeurs d’asile (CADA)',
  CAF: 'Caisses d’allocation familiale (CAF)',
  CAP_EMPLOI: 'Cap Emploi',
  CAVA: 'Centres d’adaptation à la vie active (CAVA)',
  CC: 'Communautés de Commune',
  CCAS: 'Centres communaux d’action sociale (CCAS)',
  CCONS: 'Chambres consulaires (CCI, CMA, CA)',
  CD: 'Conseils Départementaux (CD)',
  CHRS: 'Centres d’hébergement et de réinsertion sociale (CHRS)',
  CHU: 'Centres d’hébergement d’urgence (CHU)',
  CIAS: 'Centres intercommunaux d’action sociale (CIAS)',
  CIDFF:
    'Centres d’information sur les droits des femmes et des familles (CIDFF)',
  CITMET: 'Cité des métiers',
  CPH: 'Centres provisoires d’hébergement (CPH)',
  CS: 'Centre social',
  CSAPA:
    "CSAPA - Centre de soins, d'accompagnement et de prévention en addictologie",
  DEETS:
    'Directions de l’Economie, de l’Emploi, du Travail et des Solidarités (DEETS)',
  DEPT: 'Services sociaux du Conseil départemental',
  DIPLP:
    'Délégation interministérielles à la prévention et à la lutte contre la pauvreté',
  E2C: 'E2C - École de la deuxième chance',
  EA: 'Entreprise adaptée (EA)',
  EATT: 'Entreprise Adaptée (EATT)',
  EI: 'Entreprises d’insertion (EI)',
  EITI: 'Entreprises d’insertion par le travail indépendant (EITI)',
  EPCI: 'Intercommunalité (EPCI)',
  EPIDE: "EPIDE - Établissement pour l'insertion dans l'emploi",
  ESS: "Entreprise de l'Économie Sociale et Solidaire",
  ETTI: 'Entreprises de travail temporaire d’insertion (ETTI)',
  FAIS: 'Fédérations d’acteurs de l’insertion et de la solidarité',
  GEIQ: 'Groupements d’employeurs pour l’insertion et la qualification (GEIQ)',
  HUDA: "HUDA - Hébergement d'urgence pour demandeurs d'asile",
  MDE: "Maison de l'emploi",
  MDEF: "Maison de l'emploi et de la formation",
  MDPH: 'Maison Départementale des Personnes Handicapées',
  MDS: 'Maison Départementale des Solidarités',
  MJC: 'Maison des jeunes et de la culture',
  ML: 'Mission Locale',
  MQ: 'Maison de quartier',
  MSA: 'Mutualité Sociale Agricole',
  MUNI: 'Municipalités',
  OACAS:
    'Structures agréées Organisme d’accueil communautaire et d’activité solidaire (OACAS)',
  ODC: "Organisation délégataire d'un CD",
  OF: 'Organisme de formations',
  OIL: "Opérateur d'intermédiation locative",
  OPCS: 'Organisation porteuse de la clause sociale',
  PAD: "Point d'Accès au Droit",
  PE: 'Pôle emploi',
  PENSION: 'Pension de famille / résidence accueil',
  PIJ_BIJ: 'Points et bureaux information jeunesse (PIJ/BIJ)',
  PIMMS: 'Point Information Médiation Multi Services (PIMMS)',
  PJJ: 'Protection judiciaire de la jeunesse (PJJ)',
  PLIE: 'Plans locaux pour l’insertion et l’emploi (PLIE)',
  PREF: 'Préfecture, Sous-Préfecture',
  PREVENTION: 'Service ou club de prévention',
  REG: 'Région',
  RFS: 'Réseau France Services',
  RS_FJT: 'Résidence sociale / FJT - Foyer de Jeunes Travailleurs',
  SCP: 'Services et clubs de prévention',
  SPIP: 'Services pénitentiaires d’insertion et de probation (SPIP)',
  TIERS_LIEUX: 'Tiers lieu & coworking',
  UDAF: 'Union Départementale d’Aide aux Familles (UDAF)',
}

export type TypologieStructure = keyof typeof typologieStructureLabels

export const typologieStructureValue = Object.fromEntries(
  Object.keys(typologieStructureLabels).map((key) => [
    key,
    key as TypologieStructure,
  ]),
) as {
  [key in TypologieStructure]: TypologieStructure
}

export const typologieStructureOptions = labelsToOptions(
  typologieStructureLabels,
)
