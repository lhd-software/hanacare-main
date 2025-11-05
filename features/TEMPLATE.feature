Feature: <Feature Name>
  As a <user type>
  I want <goal> so that <benefit>

  Background:
    Given <initial setup>

  @Sprint_X
  Scenario: <happy path scenario>
    Given <context>
    When <action>
    Then <expected result>

  @Sprint_X
  Scenario: <edge case scenario>
    Given <context>
    When <action>
    Then <expected result>

  @Sprint_X
  Scenario Outline: <parameterized scenario>
    Given <context>
    When <action> with "<parameter>"
    Then <expected result>

    Examples:
      | parameter |
      | value1    |
      | value2    |

