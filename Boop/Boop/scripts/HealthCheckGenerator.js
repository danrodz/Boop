/**
  {
    "api": 1,
    "name": "Health Check Generator",
    "description": "Generate health check endpoint code (input: node, python, go)",
    "author": "Boop",
    "icon": "heart.text.square",
    "tags": "health,check,endpoint,monitoring,api"
  }
**/

function main(state) {
  try {
    const lang = state.text.trim().toLowerCase() || 'node';

    const healthChecks = {
      node: `// Express.js health check endpoint
app.get('/health', async (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    checks: {}
  };

  try {
    // Database check
    healthcheck.checks.database = await checkDatabase();

    // Redis check (if applicable)
    healthcheck.checks.redis = await checkRedis();

    // External API check (if applicable)
    healthcheck.checks.externalAPI = await checkExternalAPI();

    res.status(200).json(healthcheck);
  } catch (error) {
    healthcheck.message = error.message;
    res.status(503).json(healthcheck);
  }
});

async function checkDatabase() {
  try {
    await db.query('SELECT 1');
    return { status: 'ok', latency: 0 };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function checkRedis() {
  try {
    await redis.ping();
    return { status: 'ok' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}`,

      python: `# Flask health check endpoint
from flask import Flask, jsonify
import time
import psycopg2

app = Flask(__name__)
start_time = time.time()

@app.route('/health')
def health_check():
    healthcheck = {
        'uptime': time.time() - start_time,
        'message': 'OK',
        'timestamp': time.time(),
        'checks': {}
    }

    try:
        # Database check
        healthcheck['checks']['database'] = check_database()

        # Redis check (if applicable)
        healthcheck['checks']['redis'] = check_redis()

        return jsonify(healthcheck), 200
    except Exception as e:
        healthcheck['message'] = str(e)
        return jsonify(healthcheck), 503

def check_database():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        cur.execute('SELECT 1')
        cur.close()
        conn.close()
        return {'status': 'ok'}
    except Exception as e:
        return {'status': 'error', 'message': str(e)}

def check_redis():
    try:
        redis_client.ping()
        return {'status': 'ok'}
    except Exception as e:
        return {'status': 'error', 'message': str(e)}`,

      go: `// Go health check handler
package main

import (
\t"encoding/json"
\t"net/http"
\t"time"
)

type HealthCheck struct {
\tUptime    float64            \`json:"uptime"\`
\tMessage   string             \`json:"message"\`
\tTimestamp int64              \`json:"timestamp"\`
\tChecks    map[string]Status  \`json:"checks"\`
}

type Status struct {
\tStatus  string \`json:"status"\`
\tMessage string \`json:"message,omitempty"\`
}

var startTime = time.Now()

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
\thealthcheck := HealthCheck{
\t\tUptime:    time.Since(startTime).Seconds(),
\t\tMessage:   "OK",
\t\tTimestamp: time.Now().Unix(),
\t\tChecks:    make(map[string]Status),
\t}

\t// Database check
\thealthcheck.Checks["database"] = checkDatabase()

\t// Redis check
\thealthcheck.Checks["redis"] = checkRedis()

\tw.Header().Set("Content-Type", "application/json")

\tfor _, status := range healthcheck.Checks {
\t\tif status.Status != "ok" {
\t\t\thealthcheck.Message = "Service degraded"
\t\t\tw.WriteHeader(http.StatusServiceUnavailable)
\t\t\tjson.NewEncoder(w).Encode(healthcheck)
\t\t\treturn
\t\t}
\t}

\tw.WriteHeader(http.StatusOK)
\tjson.NewEncoder(w).Encode(healthcheck)
}

func checkDatabase() Status {
\terr := db.Ping()
\tif err != nil {
\t\treturn Status{Status: "error", Message: err.Error()}
\t}
\treturn Status{Status: "ok"}
}

func checkRedis() Status {
\t_, err := redisClient.Ping().Result()
\tif err != nil {
\t\treturn Status{Status: "error", Message: err.Error()}
\t}
\treturn Status{Status: "ok"}
}`
    };

    const code = healthChecks[lang];

    if (!code) {
      const available = Object.keys(healthChecks).join(', ');
      state.text = `Available languages: ${available}`;
      return;
    }

    state.text = code;
  } catch (error) {
    state.postError("Error generating health check: " + error.message);
  }
}
