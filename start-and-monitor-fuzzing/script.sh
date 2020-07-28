#!/bin/sh

printenv

echo ""

echo "cognito_user: ${INPUT_COGNITO_USER}"
echo "cognito_password: ${INPUT_COGNITO_PASSWORD}"
echo "project: ${INPUT_PROJECT}"
echo "test_collection: ${INPUT_TEST_COLLECTION}"
echo "report_email: ${INPUT_REPORT_EMAIL}"
echo "timeout: ${INPUT_TIMEOUT}"
echo "fuzzing_server_address: ${INPUT_FUZZING_SERVER_ADDRESS}"

# Login with Cognito.
cictl login -u "${INPUT_COGNITO_USER}" -p "${INPUT_COGNITO_PASSWORD}"

# Start fuzzing and monitor it until it crashes or reaches the timeout.
cictl start_and_monitor_fuzzing \
  --duration="${INPUT_TIMEOUT}" \
  --daemon_listen_address="${FUZZER_DAEMON_ADDRESS}" \
  --project_name="${PROJECT_NAME}" \
  --campaign_name="fuzz_api_DoStuff" \
  --cloud_report_recipient_email="${REPORT_EMAIL}"