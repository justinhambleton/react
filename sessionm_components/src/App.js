import React from 'react';
import UserProgressByRuleTree from './UserProgressByRuleTree';

const App = () => {
  const retailerId = 'ED0538AD-38AF-422F-8450-21FDF1A0FAE2';
  const userId = '2309f17c-4011-11ef-9209-f1fbac110003';
  const ruleTreeId = 'c45c9b1b-8859-4012-96b8-4f7159b7d1ac';
  const ruleId = '77c4fa9c-faed-47e2-b5b7-bd1b89a2b751';

  return (
    <div>
      <UserProgressByRuleTree retailerId={retailerId} userId={userId} ruleTreeId={ruleTreeId} ruleId={ruleId} />
    </div>
  );
};

export default App;
