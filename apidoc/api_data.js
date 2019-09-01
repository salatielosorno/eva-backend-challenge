define({ "api": [
  {
    "type": "get",
    "url": "/bookings?medication[]=:medication&mode=:mode&clinic=:clinic&frametime[start]=:startframetime&frametime[end]=:endframetime&page=:page&perpage=:perpage",
    "title": "Get bookings by ConsumedMedications",
    "description": "<p>Permite listado de citas. Esta estructura exige el parámetro medication como obligatorio.</p>",
    "group": "Bookings",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "medication",
            "description": "<p>Medicamento - Repetir estructura por cada medicamento</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"STRICT\"",
              "\"LAX\""
            ],
            "optional": true,
            "field": "mode",
            "defaultValue": "STRICT",
            "description": "<p>Modo de consumo de medicamento</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "clinic",
            "description": "<p>Nombre de la clinica</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "startframetime",
            "description": "<p>Fecha de inicio en formato ISO 8601</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "endframetime",
            "description": "<p>Fecha de fin en formato ISO 8601</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Pagina</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "perpage",
            "defaultValue": "1000",
            "description": "<p>Registro por página</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example:",
        "content": "GET /bookings?medication[]=HORMONE_THERAPY&medication[]=ANTIBIOTICS&medication[]=BLOOD_THINNERS&medication[]=VITAMINS&medication[]=COAGULANTS&clinic=EXPLANADA&frametime[start]=2019-11-27T01:19:51.813Z&frametime[end]=2019-11-28T01:19:51.813Z",
        "type": "curl"
      },
      {
        "title": "Example using pagination:",
        "content": "GET /bookings?medication[]=HORMONE_THERAPY&medication[]=ANTIBIOTICS&medication[]=BLOOD_THINNERS&medication[]=VITAMINS&medication[]=COAGULANTS&clinic=EXPLANADA&frametime[start]=2019-11-27T01:19:51.813Z&frametime[end]=2019-11-28T01:19:51.813Z&page=10&perpage=100",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Object[]",
            "optional": false,
            "field": "Bookings",
            "description": "<p>Lista de citas</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "Booking.name",
            "description": "<p>Nombre completo del cliente</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "Booking.email",
            "description": "<p>Email del cliente</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "Booking.datetime",
            "description": "<p>Fecha de inicio</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "Booking.clinicName",
            "description": "<p>Nombre de la clinica</p>"
          },
          {
            "group": "201",
            "type": "String[]",
            "optional": false,
            "field": "Booking.medication",
            "description": "<p>Lista de medicamentos consumidos</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\nheaders [\n     eva-total:22,\n     eva-pages: 1,\n     eva-page: 1\n]\nbody [\n  {\n     \"id\": 3210,\n     \"name\": \"Curtis Alexander\",\n     \"email\": \"curtis_alexander@gmail.com\",\n     \"datetime\": \"2019-11-27T21:22:41.553Z\",\n     \"clinicName\": \"EXPLANADA\",\n     \"medication\": [\n                    \"BLOOD_THINNERS\",\n                    \"COAGULANTS\",\n                    \"HORMONE_THERAPY\",\n                    \"ANTIBIOTICS\",\n                    \"VITAMINS\"\n                ]\n   }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/bookings.js",
    "groupTitle": "Bookings",
    "name": "GetBookingsMedicationMedicationModeModeClinicClinicFrametimeStartStartframetimeFrametimeEndEndframetimePagePagePerpagePerpage"
  },
  {
    "type": "get",
    "url": "/bookings?mode=:mode&clinic=:clinic&frametime[start]=:startframetime&frametime[end]=:endframetime&page=:page&perpage=:perpage",
    "title": "Get all bookings",
    "description": "<p>Permite listado de citas. Esta estructura no exige ningún parámetro como obligatorio.</p>",
    "group": "Bookings",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"STRICT\"",
              "\"LAX\""
            ],
            "optional": true,
            "field": "mode",
            "defaultValue": "STRICT",
            "description": "<p>Modo de consumo de medicamento</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "clinic",
            "description": "<p>Nombre de la clinica</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "startframetime",
            "description": "<p>Fecha de inicio en formato ISO 8601</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "endframetime",
            "description": "<p>Fecha de fin en formato ISO 8601</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Pagina</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "perpage",
            "defaultValue": "1000",
            "description": "<p>Registro por página</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example:",
        "content": "GET /bookings?mode=LAX&clinic=EXPLANADA&frametime[start]=2019-11-27T01:19:51.813Z&frametime[end]=2019-11-28T01:19:51.813Z",
        "type": "curl"
      },
      {
        "title": "Example using pagination:",
        "content": "GET /bookings?mode=LAX&clinic=EXPLANADA&frametime[start]=2019-11-27T01:19:51.813Z&frametime[end]=2019-11-28T01:19:51.813Z&page=10&perpage=2000",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Object[]",
            "optional": false,
            "field": "Bookings",
            "description": "<p>Lista de citas</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "Booking.name",
            "description": "<p>Nombre completo del cliente</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "Booking.email",
            "description": "<p>Email del cliente</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "Booking.datetime",
            "description": "<p>Fecha de inicio</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "Booking.clinicName",
            "description": "<p>Nombre de la clinica</p>"
          },
          {
            "group": "201",
            "type": "String[]",
            "optional": false,
            "field": "Booking.medication",
            "description": "<p>Lista de medicamentos consumidos</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\nheaders [\n     eva-total:372,\n     eva-pages: 1,\n     eva-page: 1\n]\nbody [\n  {\n     \"id\": 734,\n     \"name\": \"Pauline Alexander\",\n     \"email\": \"pauline_alexander@gmail.com\",\n     \"datetime\": \"2019-11-27T15:56:30.283Z\",\n     \"clinicName\": \"EXPLANADA\",\n     \"medication\":[\n                 \"VITAMINS\",\n                 \"BLOOD_THINNERS\",\n                 \"ANTIBIOTICS\"\n             ]\n   }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/bookings.js",
    "groupTitle": "Bookings",
    "name": "GetBookingsModeModeClinicClinicFrametimeStartStartframetimeFrametimeEndEndframetimePagePagePerpagePerpage"
  }
] });
