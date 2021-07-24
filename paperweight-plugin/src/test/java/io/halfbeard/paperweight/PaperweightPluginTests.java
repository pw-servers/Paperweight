package io.halfbeard.paperweight;

import be.seeseemelk.mockbukkit.MockBukkit;
import be.seeseemelk.mockbukkit.ServerMock;
import org.bukkit.event.player.PlayerJoinEvent;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

import java.io.File;

@RunWith(MockitoJUnitRunner.class)
public class PaperweightPluginTests {

	private ServerMock server;

	@Before
	public void setUp() {
		server = MockBukkit.mock();
		MockBukkit.loadWith(PaperweightPlugin.class, new File("build/tmp/spigotPluginYaml/plugin.yml"));
	}

	@Test
	public void shouldFirePlayerJoinEvent() {
		// TODO

		server.addPlayer();

		server.getPluginManager().assertEventFired(PlayerJoinEvent.class);
	}

	@After
	public void tearDown() {
		MockBukkit.unmock();
	}
}
