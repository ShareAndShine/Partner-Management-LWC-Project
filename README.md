# 1 - Base project setup
# Get the project base code from github by clone the below repo
# Use VS code or git command 
git clone https://github.com/ShareAndShine/partnermanagment_oct2022.git

# 2 - Code deployment
# Deploy base code to your connected org
# Use SFDX command or VS code command palatte to deploy base code to the org
sfdx force:source:deploy -u <ReplaceWothOrgAliasName>

# 3 - Assign Permission set & Load sample Data
# Use SFDX command
sfdx force:user:permset:assign -n Partner_Management_App

# Import Partner Type 

# 3.1 Bash Command
sfdx force:data:tree:import -p scripts/data/Partner_Type__c-plan.json -u <ReplaceWithOrgAliasName>
# windows command or powershell
sfdx force:data:tree:import -p scripts\data\Partner_Type__c-plan.json -u <ReplaceWithOrgAliasName>


# 3.2 Import Partner Account & Contacts

# Bash Command
sfdx force:data:tree:import -p scripts/data/Account-Contact-plan.json -u <ReplaceWithOrgAliasName>

# windows command or powershell
sfdx force:data:tree:import -p scripts\data\Account-Contact-plan.json -u <ReplaceWithOrgAliasName>


# 3.3 Fix missing data manually
#   3.1.1 Use Developer console and Run UpdatePartnerType method from DataFix class
    DataFix.UpdatePartnerType();

#   3.2.1 Go to Account list view -> Partner Accounts -> Manually update Primary contact POC for each account -> Save


# 4 Use this method to clean Sample Data and Start Fresh
#   3.1.1 Use Developer console and Run CleanData method from DataFix class
    DataFix.CleanData();