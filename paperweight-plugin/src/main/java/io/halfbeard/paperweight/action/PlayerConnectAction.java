package io.halfbeard.paperweight.action;

public class PlayerConnectAction extends Action {
	public String username;

	@Override
	public String getActionName() {
		return "player_connect";
	}
}
