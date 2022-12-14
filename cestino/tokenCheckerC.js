/* 	Verifica se l'utente dispone di un token, assegnato nel momento in cui effettua il login.
	Verifica inoltre se tale token è ancora valido o se è scaduto */


	const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

	const tokenChecker = function(req, res, next) {
		
		// Mi facio restituire un token, ma non sapendo dove si trova lo cerco tra body, query o headers
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
	
		// Se non viene trovato nessun token, viene rifiutato l'accesso
		if (!token) {
			//Viene restituito l'errore 401, equivalente ad "accesso non autorizzato"
			return res.status(401).send({ 
				success: false,
				message: 'Non è stato trovato alcun token'
			});
		}
	
		// Viene verificata la validità del token
		jwt.verify(token, process.env.SUPER_SECRET, function(err, decoded) {			
			if (err) {
				// Viene restituito l'errore 403, equivalente ad "accesso negato"
				return res.status(403).send({
					success: false,
					message: 'Il token di sessione è scaduto'
				});		
			} else {
				// Il token è valido, è possibile proseguire
				req.loggedUser = decoded;
				next();	//Viene richiamato route, permettendogli di rimanere in attessa della prossima chiamata API
			}
		});
		
	};
	
	module.exports = tokenChecker
	