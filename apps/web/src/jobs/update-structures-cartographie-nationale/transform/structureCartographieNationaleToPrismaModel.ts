import type { Prisma } from '@prisma/client'
import { extractIdsFromCartographieNationaleStructure } from '@app/web/data/cartographie-nationale/extractIdsFromCartographieNationaleStructure'
import type { LieuStandardMediationNumerique } from '@app/web/data/standard-mediation-numerique/LieuStandardMediationNumerique'

export const structureCartographieNationaleToPrismaModel = (
  structure: LieuStandardMediationNumerique,
): Prisma.StructureCartographieNationaleCreateManyInput => ({
  id: structure.id,
  dateMaj: new Date(structure.date_maj),
  source: structure.source,
  pivot: structure.pivot,
  nom: structure.nom,
  latitude: structure.latitude,
  longitude: structure.longitude,
  presentationDetail: structure.presentation_detail,
  presentationResume: structure.presentation_resume,
  siteWeb: structure.site_web,
  telephone: structure.telephone,
  typologie: structure.typologie,
  adresse: structure.adresse,
  autresFormationsLabels: structure.autres_formations_labels,
  codeInsee: structure.code_insee,
  codePostal: structure.code_postal,
  commune: structure.commune,
  complementAdresse: structure.complement_adresse,
  courriels: structure.courriels,
  dispositifProgrammesNationaux: structure.dispositif_programmes_nationaux,
  ficheAccesLibre: structure.fiche_acces_libre,
  formationsLabels: structure.formations_labels,
  fraisACharge: structure.frais_a_charge,
  horaires: structure.horaires,
  itinerance: structure.itinerance,
  modalitesAcces: structure.modalites_acces,
  modalitesAccompagnement: structure.modalites_accompagnement,
  priseEnChargeSpecifique: structure.prise_en_charge_specifique,
  priseRdv: structure.prise_rdv,
  publicsSpecifiquementAdresses: structure.publics_specifiquement_adresses,
  services: structure.services,
  structureParente: structure.structure_parente,
  ...extractIdsFromCartographieNationaleStructure({ id: structure.id }),
})