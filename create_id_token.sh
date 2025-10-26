#!/bin/bash

if [ "$#" -ne 4 ]; then
    echo "Usage: $0 <observationProtocolSurveyId> <caseId> <surveyId> <languageId>"
    echo "Example: $0 obs123 case456 survey789 en"
    exit 1
fi

# Build JSON
json=$(cat <<EOF
{"observationProtocolSurveyId":"$1","caseId":"$2","surveyId":"$3","languageId":"$4"}
EOF
)

# Encode to base64 (no line breaks) and make URL-safe
token=$(echo -n "$json" | base64 -w 0 2>/dev/null || echo -n "$json" | base64 -b 0)

echo "Token: $token"
