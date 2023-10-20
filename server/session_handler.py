import secrets
import time


class SessionHandler:
    def __init__(self, ttl: float):
        self._ttl = ttl
        self._sessions: dict[str, tuple[str, float]] = {}

    def new_session(self, uid: str) -> str:  # i.e. login
        token = secrets.token_urlsafe()
        self._sessions[token] = (uid, time.time() + self._ttl * 60)
        return token

    def validate_session(self, session_id: str) -> bool:  # i.e. any auth request
        if session_id not in self._sessions:
            return False

        data = self._sessions[session_id]
        if time.time() > data[1]:  # Expired
            self._sessions.pop(session_id)
            return False

        # Refresh
        self._sessions[session_id] = (data[0], time.time() + self._ttl * 60)
        return True

    def end_session(self, session_id: str):  # i.e. logout
        if session_id in self._sessions:
            self._sessions.pop(session_id)
