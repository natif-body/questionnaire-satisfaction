// =============================================================
// NATIF BODY — Script Google Sheets pour le questionnaire
// =============================================================
// Ce script reçoit les réponses du formulaire et les enregistre
// automatiquement dans ta Google Sheet.
//
// INSTRUCTIONS :
// 1. Ouvre Google Sheets > Créer une feuille vierge
// 2. Va dans Extensions > Apps Script
// 3. Supprime le code existant et colle tout ce fichier
// 4. Clique sur "Déployer" > "Nouveau déploiement"
// 5. Type : "Application Web"
//    - Exécuter en tant que : "Moi"
//    - Accès : "Tout le monde"
// 6. Clique sur "Déployer" et copie l'URL générée
// 7. Colle cette URL dans index.html à la ligne GOOGLE_SCRIPT_URL
// =============================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Ajouter les en-têtes si la feuille est vide
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Horodatage',
        'Fréquence de visite',
        'Freins',
        'Avis coaching',
        'Créneaux souhaités',
        'Ce qui ferait revenir',
        'Commentaire libre',
        'Email'
      ]);

      // Mettre les en-têtes en gras
      var headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#C8102E');
      headerRange.setFontColor('#FFFFFF');

      // Figer la première ligne
      sheet.setFrozenRows(1);
    }

    // Ajouter la réponse
    sheet.appendRow([
      new Date(),
      data.frequence || 'Non répondu',
      (data.freins || []).join(', '),
      data.coaching || 'Non répondu',
      data.creneaux || 'Non répondu',
      (data.retour || []).join(', '),
      data.commentaire || '',
      data.email || ''
    ]);

    // Ajuster la largeur des colonnes
    sheet.autoResizeColumns(1, 8);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fonction de test — exécute-la manuellement pour vérifier que tout marche
function testDoPost() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        frequence: '3+ fois/semaine',
        freins: ['Manque de motivation', 'Vie pro/perso chargée'],
        coaching: 'Top, rien à changer',
        creneaux: 'Oui, parfait',
        retour: ['Nouveaux concepts de cours', 'Des défis collectifs / challenges'],
        commentaire: 'Super salle, continuez comme ça !',
        email: 'test@exemple.com'
      })
    }
  };

  var result = doPost(testData);
  Logger.log(result.getContent());
}
